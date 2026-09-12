import { Dimension, Pack, labels } from "./packs";
import { tellVariants } from "./tell-variants";

export type ScoreMap = Partial<Record<Dimension, number>>;

function attainableRange(pack: Pack) {
  return pack.questions.reduce(({ min, max }, question) => {
    const values = question.options.map(option => option.weights[pack.id] ?? 0);
    return { min: min + Math.min(...values), max: max + Math.max(...values) };
  }, { min: 0, max: 0 });
}

export function scorePack(pack: Pack, answers: number[]) {
  const dimensions: ScoreMap = {};
  pack.questions.forEach((question, i) => {
    const option = question.options[answers[i]];
    Object.entries(option?.weights ?? {}).forEach(([key, value]) => {
      const d = key as Dimension;
      dimensions[d] = (dimensions[d] ?? 0) + (value ?? 0);
    });
  });
  const ranked = Object.entries(dimensions).sort((a, b) => b[1] - a[1]) as [Dimension, number][];
  const packScore = dimensions[pack.id] ?? 0;
  const range = attainableRange(pack);
  const normalizedScore = range.max === range.min ? 50 : Math.round(((packScore - range.min) / (range.max - range.min)) * 100);
  const band = normalizedScore < 20 ? "low" : normalizedScore < 40 ? "leaningLow" : normalizedScore < 60 ? "balanced" : normalizedScore < 80 ? "leaningHigh" : "high";
  const primaryContributions = pack.questions.map((question, index) => question.options[answers[index]]?.weights[pack.id] ?? 0);
  const positive = primaryContributions.filter(value => value > 0).length;
  const negative = primaryContributions.filter(value => value < 0).length;
  const patternNote = positive > 0 && negative > 0
    ? "Context changed the direction of your answers."
    : positive + negative >= 4
      ? "The pattern appeared across most of the five situations."
      : "A small number of strong choices produced most of this result.";
  const secondary = (Object.entries(dimensions) as [Dimension, number][])
    .filter(([dimension, value]) => dimension !== pack.id && value !== 0)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
  const secondaryNote = secondary && Math.abs(secondary[1]) >= 2
    ? `Your choices also gave ${secondary[1] > 0 ? "greater" : "lower"} weight to ${labels[secondary[0]].toLowerCase()}.`
    : "";
  const variant = tellVariants[pack.id][band];
  const explanation = [variant.body, patternNote, secondaryNote].filter(Boolean).join(" ");
  const confidence = Math.min(94, 56 + (positive + negative) * 5 + Math.round(Math.abs(normalizedScore - 50) / 4));
  return { dimensions, primarySignal: labels[pack.id], secondarySignals: secondary ? [labels[secondary[0]]] : [], confidence, normalizedScore, reveal: { ...variant, body: explanation, note: pack.reveal.note }, band };
}

export function profileSignals(scores: ScoreMap) {
  return (Object.entries(scores) as [Dimension, number][]).map(([d, score]) => [d, Math.max(0, Math.min(100, Math.round(score)))] as const).sort((a, b) => b[1] - a[1]);
}
