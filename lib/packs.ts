export type Dimension =
  | "optimization" | "planning" | "control" | "uncertainty" | "conformity"
  | "risk" | "social" | "detail" | "novelty" | "rules" | "decision" | "conflict";

export type Option = { label: string; weights: Partial<Record<Dimension, number>> };
export type Question = { text: string; options: Option[] };
export type Pack = {
  id: Dimension; name: string; questions: Question[];
  reveal: { title: string; body: string; note: string };
};

const q = (text: string, options: [string, Partial<Record<Dimension, number>>][]): Question => ({
  text, options: options.map(([label, weights]) => ({ label, weights })),
});

export const packs: Pack[] = [
  { id: "optimization", name: "quiet improvements", reveal: { title: "you like to optimize", body: "You notice the little frictions most people step around. You don't need everything to be perfect, but once you spot a better route, it is hard to unsee it.", note: "A playful read on efficiency-seeking, based on several small choices—not a diagnosis." }, questions: [
    q("You find a queue of twelve people and an unstaffed counter beside it. You…", [["wait your turn", { rules: 2 }], ["ask if the counter can open", { optimization: 3, social: 1 }], ["look for another route", { optimization: 2 }], ["watch what everyone else does", { conformity: 2 }]]),
    q("A recipe says to dirty three bowls. Your instinct is to…", [["use all three", { rules: 1 }], ["find a one-bowl version", { optimization: 3 }], ["start and decide later", { decision: 1 }], ["order food instead", { novelty: 1 }]]),
    q("An app makes you tap six times to do something simple. You…", [["accept it", { uncertainty: 1 }], ["hunt for a shortcut", { optimization: 3 }], ["complain, then accept it", { conflict: 1, optimization: 1 }], ["try a different app", { novelty: 2, optimization: 1 }]]),
    q("At a nearly empty lot, you choose the spot that is…", [["closest to the door", { optimization: 2 }], ["easiest to leave later", { planning: 2, optimization: 2 }], ["least likely to get dinged", { control: 2 }], ["first one I see", { decision: 2 }]]),
    q("You learn a keyboard shortcut by accident. You…", [["forget it immediately", { novelty: 0 }], ["start using it everywhere", { optimization: 3 }], ["tell someone about it", { social: 1, optimization: 1 }], ["save it for later", { planning: 1 }]]),
  ]},
  { id: "uncertainty", name: "the unknown", reveal: { title: "you don't hate uncertainty. you hate uncertain control.", body: "You can live with an unknown when you can explore it on your own terms. The harder version is being left out of the loop while someone else holds the map.", note: "A reflection on ambiguity tolerance and control preferences." }, questions: [
    q("A friend texts “we need to talk.” Your first thought is…", [["what happened?", { uncertainty: 3 }], ["okay, later", { uncertainty: -2 }], ["probably nothing", { uncertainty: -3 }], ["I ask what it is about", { control: 2, uncertainty: 1 }]]),
    q("A sealed mystery box appears on your desk. You…", [["open it now", { uncertainty: -2, novelty: 2 }], ["ask who sent it", { control: 2 }], ["leave it alone", { uncertainty: 2 }], ["shake it first", { detail: 1, control: 1 }]]),
    q("Your train board says “delayed” with no time. You…", [["find another route", { control: 2, optimization: 1 }], ["wait and see", { uncertainty: -2 }], ["check every few minutes", { uncertainty: 2, detail: 1 }], ["make a backup plan", { planning: 2 }]]),
    q("Someone starts telling a story, then says “I'll tell you later.”", [["forget about it", { uncertainty: -2 }], ["spend all day wondering", { uncertainty: 3 }], ["ask one follow-up", { control: 1 }], ["make up the ending", { novelty: 2 }]]),
    q("You can try a new restaurant with no reviews. You…", [["go for it", { uncertainty: -3, novelty: 2 }], ["read the menu first", { control: 2 }], ["choose somewhere familiar", { uncertainty: 2 }], ["ask a local", { social: 2 }]]),
  ]},
  { id: "conformity", name: "the crowd", reveal: { title: "you use the crowd as information—not instruction.", body: "You notice what other people are doing, but you do not automatically let that decide for you. Consensus is a clue; your own judgment still gets the final vote.", note: "A playful observation about independence and social calibration." }, questions: [
    q("Everyone at the table orders the same dish. You want something else.", [["order the same", { conformity: 3 }], ["order what I want", { conformity: -3 }], ["ask if it is actually good", { social: 2 }], ["pick the second-most popular", { conformity: 1 }]]),
    q("A group chat reacts positively to an idea you dislike. You…", [["stay quiet", { conformity: 2, conflict: -1 }], ["say I see it differently", { conformity: -2, conflict: 1 }], ["ask a question about it", { social: 2 }], ["wait for someone else", { conformity: 2 }]]),
    q("At a museum, everyone is photographing one painting. You…", [["photograph it too", { conformity: 2 }], ["look for the quiet room", { conformity: -2, novelty: 1 }], ["wonder what I missed", { social: 1 }], ["walk past", { decision: 1 }]]),
    q("A trend suddenly appears everywhere. Your reaction is…", [["try it early", { conformity: 1, novelty: 2 }], ["wait until it settles", { conformity: -2, planning: 1 }], ["avoid it on principle", { conformity: -3 }], ["ask why it caught on", { detail: 1 }]]),
    q("You are voting on a trivial group decision. You…", [["go with the majority", { conformity: 2 }], ["state my preference", { conformity: -2 }], ["offer a compromise", { social: 2 }], ["don't care either way", { decision: 1 }]]),
  ]},
  { id: "planning", name: "before the thing", reveal: { title: "you prepare for the version of the day that goes sideways.", body: "You are not necessarily rigid. You simply prefer a little runway: enough context, enough margin, and fewer surprises waiting at the gate.", note: "A reflection on everyday preparation habits." }, questions: [
    q("A trip is two weeks away. Your bag is…", [["basically packed", { planning: 3 }], ["a mental list", { planning: 1 }], ["not a thought yet", { planning: -2 }], ["half-packed from last time", { planning: 1 }]]),
    q("You get a calendar invite with no agenda. You…", [["accept it", { planning: -1 }], ["ask what it is for", { planning: 2, control: 1 }], ["prepare nothing", { planning: -2 }], ["make an educated guess", { planning: 1 }]]),
    q("Before trying a new route, you usually…", [["check the map", { planning: 3 }], ["just start driving", { planning: -2 }], ["check only the first turn", { planning: 1 }], ["save two backups", { planning: 3, control: 1 }]]),
    q("You have a free Saturday. You prefer…", [["a loose plan", { planning: 2 }], ["no plan at all", { planning: -2 }], ["an hour-by-hour plan", { planning: 3, control: 1 }], ["one anchor and room around it", { planning: 1 }]]),
    q("When someone says “bring whatever you need,” you…", [["bring too much", { planning: 2 }], ["bring exactly the basics", { optimization: 1 }], ["figure it out there", { planning: -2 }], ["ask a clarifying question", { planning: 2 }]]),
  ]},
  { id: "control", name: "the steering wheel", reveal: { title: "you like to keep a hand on the wheel.", body: "You are comfortable delegating when the shape of things is clear. What unsettles you is a decision with no visibility, no say, and no way to steer if it starts drifting.", note: "A reflection on autonomy and perceived control." }, questions: [
    q("Someone else offers to plan your birthday. You…", [["love the surprise", { control: -3 }], ["want the broad plan", { control: 2 }], ["ask to choose the place", { control: 3 }], ["say no thanks", { control: 2 }]]),
    q("An automatic update starts right before a meeting. You…", [["let it happen", { control: -2 }], ["pause it immediately", { control: 3 }], ["check how long it takes", { control: 1, detail: 1 }], ["switch devices", { optimization: 1 }]]),
    q("A friend says “trust me” before revealing the plan. You…", [["am in", { control: -2 }], ["ask for one clue", { control: 2 }], ["need the full itinerary", { control: 3, planning: 1 }], ["wait to see who else goes", { conformity: 1 }]]),
    q("You are ordering food for a group. You prefer…", [["someone else decides", { control: -2 }], ["a shared shortlist", { control: 1, social: 1 }], ["choosing it myself", { control: 3 }], ["everyone chooses their own", { control: 1 }]]),
    q("A taxi takes an unfamiliar turn. You…", [["assume they know", { control: -2 }], ["quietly check the map", { control: 2, detail: 1 }], ["ask where we are going", { control: 3 }], ["enjoy the scenery", { novelty: 1 }]]),
  ]},
  { id: "risk", name: "the edge", reveal: { title: "you take risks when the upside feels real.", body: "You are not chasing chaos for its own sake. You are willing to move before certainty arrives when the possibility is worth the wobble—and you can see the exit.", note: "A playful read on ordinary risk choices, not risk-taking in every domain." }, questions: [
    q("A menu has a dish you cannot pronounce. You…", [["order it", { risk: 3, novelty: 1 }], ["google it first", { risk: -1, control: 1 }], ["choose the usual", { risk: -3 }], ["ask the server", { social: 1 }]]),
    q("You can buy a cheaper ticket with one tight connection. You…", [["take it", { risk: 3 }], ["pay more for direct", { risk: -2, planning: 1 }], ["check airport maps", { risk: 1, planning: 1 }], ["let someone else choose", { control: -1 }]]),
    q("A friend suggests an unplanned late-night drive. You…", [["grab my keys", { risk: 3 }], ["ask where first", { risk: 0, control: 1 }], ["decline", { risk: -2 }], ["go if there is a playlist", { novelty: 2 }]]),
    q("You find a shortcut that looks a little sketchy. You…", [["try it", { risk: 3 }], ["check it on maps", { risk: 0, planning: 1 }], ["stay on the known route", { risk: -3 }], ["send someone ahead", { social: 1, risk: 1 }]]),
    q("A hobby class has a “beginner showcase” tonight. You…", [["sign up", { risk: 3 }], ["watch first", { risk: -1 }], ["wait for next time", { risk: -2 }], ["bring a friend", { social: 1, risk: 1 }]]),
  ]},
  { id: "social", name: "reading the room", reveal: { title: "you notice the temperature in a room.", body: "You pick up on small shifts: a pause that lasted too long, a joke that landed oddly, the person becoming quieter at the edge of a group. You often sense the atmosphere before it is named.", note: "A playful reflection on social attention." }, questions: [
    q("At dinner, one person stops talking. You…", [["keep talking", { social: -2 }], ["notice right away", { social: 3 }], ["ask them a question", { social: 3 }], ["assume they are listening", { social: -1 }]]),
    q("You send a joke and it gets no reaction. You…", [["move on", { social: -1 }], ["wonder if it landed badly", { social: 2 }], ["send another joke", { risk: 1 }], ["clarify it was a joke", { social: 2, control: 1 }]]),
    q("A friend says “I'm fine” differently than usual. You…", [["take it literally", { social: -2 }], ["ask again later", { social: 3 }], ["ask immediately", { social: 2 }], ["send a meme", { social: 1 }]]),
    q("You arrive at a party where you know one person. You…", [["scan the group dynamics", { social: 2 }], ["find my person", { social: 0 }], ["introduce myself around", { risk: 1 }], ["look for the snacks", { decision: 1 }]]),
    q("In a meeting, someone is interrupted twice. You…", [["do nothing", { social: -2 }], ["bring them back in", { social: 3, conflict: 1 }], ["make a note", { detail: 1 }], ["message them later", { social: 2 }]]),
  ]},
  { id: "detail", name: "small things", reveal: { title: "the small details keep tapping you on the shoulder.", body: "You catch the loose thread, the slightly crooked label, the one word that changes the meaning. You may not seek perfection, but your attention has a sharp little edge.", note: "A reflection on detail orientation in everyday settings." }, questions: [
    q("A picture frame is tilted by one degree. You…", [["do not notice", { detail: -3 }], ["notice, leave it", { detail: 1 }], ["straighten it", { detail: 3 }], ["ask who tilted it", { detail: 2 }]]),
    q("A menu misspells a familiar word. You…", [["read past it", { detail: -2 }], ["notice immediately", { detail: 3 }], ["take a photo", { detail: 2 }], ["want to correct it", { detail: 3, conflict: 1 }]]),
    q("When someone gives directions, you remember…", [["the general idea", { detail: -2 }], ["landmarks", { detail: 1 }], ["exact turns", { detail: 3 }], ["the funny part", { social: 1 }]]),
    q("You borrow a pen and return it. You…", [["drop it nearby", { detail: -2 }], ["put it exactly back", { detail: 3 }], ["ask where it lives", { detail: 2 }], ["forget whose it was", { detail: -3 }]]),
    q("A movie continuity error appears. You…", [["never see it", { detail: -3 }], ["spot it", { detail: 3 }], ["pause to confirm", { detail: 3 }], ["hear about it later", { social: 0 }]]),
  ]},
  { id: "novelty", name: "new doors", reveal: { title: "you are drawn to the door you have not opened yet.", body: "Familiar is comforting, but new has gravity. A different route, a strange flavour, an untested idea—these are invitations, not disruptions.", note: "A playful reflection on novelty-seeking." }, questions: [
    q("Your usual café has one new drink. You…", [["get the usual", { novelty: -3 }], ["try the new one", { novelty: 3 }], ["ask for a sip", { novelty: 1, social: 1 }], ["wait for reviews", { novelty: -1 }]]),
    q("A bookshelf has a genre you never read. You…", [["walk past", { novelty: -2 }], ["pick one at random", { novelty: 3 }], ["read the blurbs", { novelty: 1 }], ["ask for a recommendation", { social: 1 }]]),
    q("Your phone suggests rearranging the home screen. You…", [["keep it identical", { novelty: -2, control: 1 }], ["try it", { novelty: 2 }], ["make my own system", { optimization: 1, novelty: 1 }], ["ignore the suggestion", { novelty: -1 }]]),
    q("A weekend has no commitments. You are tempted to…", [["return to my favorite spot", { novelty: -2 }], ["visit a new neighborhood", { novelty: 3 }], ["ask friends what is happening", { social: 1 }], ["start a tiny project", { novelty: 1 }]]),
    q("You find an unfamiliar button on a machine you own. You…", [["do not touch it", { novelty: -2, control: 1 }], ["press it once", { novelty: 3 }], ["look it up", { novelty: 1, detail: 1 }], ["cover it with tape", { control: 2 }]]),
  ]},
  { id: "rules", name: "the line", reveal: { title: "you see rules as tools, not decoration.", body: "You are comfortable with a rule when it protects something real: fairness, safety, flow. When it feels pointless, though, you start looking for the logic behind it—or around it.", note: "A playful reflection on rule orientation." }, questions: [
    q("The pedestrian light is red, but the street is completely empty. You…", [["wait", { rules: 3 }], ["cross", { rules: -3, risk: 1 }], ["check twice then cross", { rules: -1, detail: 1 }], ["wait if others are watching", { conformity: 2 }]]),
    q("A sign says “do not sit here” with no obvious reason. You…", [["do not sit", { rules: 3 }], ["sit anyway", { rules: -3 }], ["ask why", { rules: 0, novelty: 1 }], ["sit nearby", { rules: 1 }]]),
    q("You find a harmless loophole in a game. You…", [["ignore it", { rules: 3 }], ["use it once", { rules: -1, novelty: 1 }], ["tell everyone", { social: 1 }], ["report it", { rules: 3 }]]),
    q("An event says formal shoes only. You own none. You…", [["buy or borrow some", { rules: 3 }], ["wear neat sneakers", { rules: -1 }], ["ask the host", { social: 1, rules: 1 }], ["skip it", { rules: 1 }]]),
    q("A board game rule causes an argument. You…", [["read the rulebook", { rules: 3, detail: 1 }], ["make a house rule", { rules: -2 }], ["vote on it", { conformity: 1 }], ["quit while ahead", { conflict: -1 }]]),
  ]},
  { id: "decision", name: "the moment", reveal: { title: "you decide once the shape is clear.", body: "You do not need every fact. You need the few that change the choice. After that, you would rather move than keep circling the same four options.", note: "A reflection on decision pace and closure." }, questions: [
    q("A delivery app has two nearly identical options. You…", [["pick one quickly", { decision: 3 }], ["compare reviews", { decision: -2, detail: 1 }], ["ask someone", { social: 1 }], ["close the app", { decision: -1 }]]),
    q("You are choosing a movie for tonight. You…", [["choose in under a minute", { decision: 3 }], ["watch trailers for ages", { decision: -3 }], ["use a randomizer", { decision: 2, novelty: 1 }], ["let someone else pick", { control: -1 }]]),
    q("You get a choice with a two-minute deadline. You…", [["trust my gut", { decision: 3 }], ["hate the deadline", { decision: -2, uncertainty: 1 }], ["ask for more time", { planning: 1 }], ["choose the safest option", { risk: -1 }]]),
    q("A server asks “still deciding?” You…", [["know already", { decision: 3 }], ["need another minute", { decision: -2 }], ["ask what they recommend", { social: 1 }], ["order the usual", { decision: 1 }]]),
    q("When a small purchase has too many variants, you…", [["choose the first good one", { decision: 3 }], ["make a comparison chart", { decision: -3, detail: 1 }], ["pick the middle option", { decision: 1 }], ["leave it for later", { decision: -2 }]]),
  ]},
  { id: "conflict", name: "friction", reveal: { title: "you prefer useful friction to quiet resentment.", body: "You do not go looking for arguments. But if a small honest correction prevents a bigger mess later, you are more willing than most to name the thing.", note: "A playful reflection on everyday conflict style." }, questions: [
    q("A friend keeps choosing a restaurant you dislike. You…", [["go along", { conflict: -3 }], ["suggest somewhere else", { conflict: 2 }], ["say I hate it", { conflict: 3 }], ["eat beforehand", { conflict: -1, optimization: 1 }]]),
    q("Someone cuts in front of you in a line. You…", [["let it go", { conflict: -2 }], ["say something politely", { conflict: 2 }], ["make eye contact only", { conflict: 0 }], ["call them out", { conflict: 3 }]]),
    q("A teammate claims your idea in a meeting. You…", [["say nothing", { conflict: -3 }], ["clarify the history", { conflict: 2 }], ["talk to them after", { conflict: 1, social: 1 }], ["joke about it", { conflict: 0 }]]),
    q("A neighbor's music is loud after midnight. You…", [["use earplugs", { conflict: -2 }], ["send a kind message", { conflict: 2 }], ["knock immediately", { conflict: 3 }], ["wait one more night", { conflict: -1 }]]),
    q("You disagree with a minor group plan. You…", [["adapt", { conflict: -2 }], ["offer an alternative", { conflict: 2 }], ["argue the case", { conflict: 3 }], ["make it work quietly", { conflict: -1, optimization: 1 }]]),
  ]},
];

export const labels: Record<Dimension, string> = {
  optimization: "Optimization", planning: "Planning", control: "Control", uncertainty: "Need for certainty", conformity: "Conformity", risk: "Risk comfort", social: "Social awareness", detail: "Attention to detail", novelty: "Novelty seeking", rules: "Rule adherence", decision: "Decision speed", conflict: "Directness",
};
