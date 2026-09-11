import { Dimension, Pack, labels } from "./packs";

export type ScoreMap = Partial<Record<Dimension, number>>;
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
  return { dimensions, primarySignal: labels[ranked[0]?.[0] ?? pack.id], secondarySignals: ranked.slice(1, 3).map(([d]) => labels[d]), confidence: Math.min(92, 58 + Math.abs(ranked[0]?.[1] ?? 0) * 6), reveal: pack.reveal };
}

export function profileSignals(scores: ScoreMap) {
  return (Object.entries(scores) as [Dimension, number][]).map(([d, score]) => [d, Math.max(28, Math.min(94, Math.round(52 + score * 7)))] as const).sort((a, b) => b[1] - a[1]);
}
