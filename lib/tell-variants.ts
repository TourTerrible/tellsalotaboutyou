import { Dimension } from "./packs";

type TellVariant = { title: string; body: string };
type TellScale = { low: TellVariant; leaningLow: TellVariant; balanced: TellVariant; leaningHigh: TellVariant; high: TellVariant };

export const tellVariants: Record<Dimension, TellScale> = {
  optimization: {
    low: {
      title: "You leave working systems alone.",
      body: "Small inefficiencies rarely hold your attention for long. When a process works, you tend to use it and direct your effort elsewhere.",
    },
    leaningLow: {
      title: "You tolerate minor friction when change costs more.",
      body: "A small inefficiency does not automatically require correction. You tend to compare the likely benefit with the effort involved.",
    },
    balanced: {
      title: "You improve systems when the benefit is clear.",
      body: "You notice unnecessary steps, although you do not correct every one of them. Effort is reserved for changes that produce a useful result.",
    },
    leaningHigh: {
      title: "You often look for a cleaner method.",
      body: "Repeated effort prompts you to consider a simpler process. Practical improvements receive attention even when the original method remains usable.",
    },
    high: {
      title: "You notice inefficient systems very quickly.",
      body: "Extra steps and repeated delays attract your attention. Once a simpler method becomes visible, you are likely to adopt it and remember it.",
    },
  },
  uncertainty: {
    low: {
      title: "You remain composed when information is incomplete.",
      body: "Unanswered questions can remain unresolved for a time without taking over your attention. You tend to respond when reliable information becomes available.",
    },
    leaningLow: {
      title: "You can proceed with a few unanswered questions.",
      body: "Incomplete information causes limited disruption. You usually wait for useful facts before changing course.",
    },
    balanced: {
      title: "A small amount of context gives you enough certainty.",
      body: "You can proceed without a complete account of the situation. A rough outline helps you judge what deserves attention and what can wait.",
    },
    leaningHigh: {
      title: "You prefer uncertainty to be resolved promptly.",
      body: "Missing context holds your attention until a reasonable explanation appears. A direct question often provides the clarity you require.",
    },
    high: {
      title: "Unclear situations occupy your attention.",
      body: "Missing information creates tension, especially when another person controls it. Even difficult news may become easier to manage once the facts are known.",
    },
  },
  conformity: {
    low: {
      title: "Group opinion has limited influence on your choices.",
      body: "You register what other people prefer and still retain your original view. A difference of opinion causes little discomfort when the decision is personal.",
    },
    leaningLow: {
      title: "You usually retain your own preference in a group.",
      body: "Other people's choices are considered without becoming decisive. You remain comfortable with a modest difference of opinion.",
    },
    balanced: {
      title: "You consider the group before making your own decision.",
      body: "Other people's choices provide useful information. You take that evidence into account, then decide according to your own preference.",
    },
    leaningHigh: {
      title: "You often favour agreement on minor choices.",
      body: "Group preference carries weight when the personal cost is small. Agreement can matter more than securing your first choice.",
    },
    high: {
      title: "You protect agreement in low-stakes situations.",
      body: "Minor personal preferences can be set aside when group harmony matters more. This tendency appears strongest when the outcome has little lasting consequence.",
    },
  },
  planning: {
    low: {
      title: "You prefer to plan close to the moment.",
      body: "Advance preparation is kept light. This allows you to respond to current conditions, though practical tasks may be completed under time pressure.",
    },
    leaningLow: {
      title: "You keep plans light until action is required.",
      body: "Early preparation is limited to the main requirements. Many details are settled when the situation becomes immediate.",
    },
    balanced: {
      title: "You use a flexible plan.",
      body: "A few fixed points provide enough structure. The remaining details can change as new information appears.",
    },
    leaningHigh: {
      title: "You usually prepare before time pressure begins.",
      body: "A modest amount of advance work reduces later disruption. You prefer to settle important details while changes remain easy.",
    },
    high: {
      title: "You prepare early for practical problems.",
      body: "Advance planning reduces avoidable disruption. You tend to remember the small requirements that become important later.",
    },
  },
  control: {
    low: {
      title: "You are comfortable letting others direct the plan.",
      body: "Shared decisions do not require continuous oversight from you. Unexpected changes may prompt interest before concern.",
    },
    leaningLow: {
      title: "You give others room to direct shared plans.",
      body: "Responsibility can be transferred without close supervision. You tend to intervene only when a decision carries a clear consequence.",
    },
    balanced: {
      title: "You can delegate when the plan remains visible.",
      body: "Another person may take responsibility while you retain a general view of the situation. Limited oversight appears sufficient for you.",
    },
    leaningHigh: {
      title: "You prefer some influence over shared decisions.",
      body: "Participation matters when a plan affects you directly. A broad account may be sufficient if there is still an opportunity to respond.",
    },
    high: {
      title: "You prefer direct influence over important decisions.",
      body: "Exclusion from a decision can be more difficult than the decision itself. Clear information and some ability to intervene reduce that discomfort.",
    },
  },
  risk: {
    low: {
      title: "You take risks only when the case is strong.",
      body: "A possible reward must justify the uncertainty involved. Reliable options remain attractive when they protect time, money, or personal comfort.",
    },
    leaningLow: {
      title: "You usually choose the reliable option.",
      body: "Predictable outcomes carry a clear advantage for you. Some uncertainty is acceptable when the possible loss remains limited.",
    },
    balanced: {
      title: "You accept risk after a brief assessment.",
      body: "A worthwhile outcome can justify uncertainty. You tend to check the main consequences before committing.",
    },
    leaningHigh: {
      title: "You accept risk when the return is clear.",
      body: "A useful or interesting result can justify significant uncertainty. You still attend to the most likely cost before deciding.",
    },
    high: {
      title: "Unfamiliar options attract you despite the risk.",
      body: "Possible regret carries less weight when an experience appears interesting. You may act while other people are still comparing outcomes.",
    },
  },
  social: {
    low: {
      title: "You tend to accept what people say directly.",
      body: "Statements are usually taken at face value unless clear evidence suggests another meaning. This reduces the amount of interpretation applied to ordinary exchanges.",
    },
    leaningLow: {
      title: "You give social cues limited weight.",
      body: "Subtle changes in tone may register without requiring analysis. Direct statements usually provide the evidence you use.",
    },
    balanced: {
      title: "You notice social cues and verify your interpretation.",
      body: "Changes in tone or participation register quickly. You tend to seek further evidence before deciding what those changes mean.",
    },
    leaningHigh: {
      title: "You read changes in tone with close attention.",
      body: "A shift in another person's manner receives early attention. You often compare it with the wider situation before responding.",
    },
    high: {
      title: "You detect small changes in group behaviour.",
      body: "A shorter reply or an unusual pause may be noticed early. Shifts in social atmosphere often become visible to you before they are discussed.",
    },
  },
  detail: {
    low: {
      title: "You focus on the overall result.",
      body: "Minor inconsistencies receive little attention when the main task is working. This allows progress to continue without repeated correction.",
    },
    leaningLow: {
      title: "You notice details without dwelling on them.",
      body: "Small inconsistencies may register and then pass. Your attention returns to the main purpose unless a detail changes the result.",
    },
    balanced: {
      title: "You notice details and decide which ones matter.",
      body: "Small errors register, though many are left alone. Attention is directed toward details that affect meaning or function.",
    },
    leaningHigh: {
      title: "You give small inconsistencies sustained attention.",
      body: "Minor changes are noticed with regularity. You often assess whether they indicate a larger problem before setting them aside.",
    },
    high: {
      title: "Small irregularities are difficult for you to miss.",
      body: "Changes in wording, position, or appearance become visible quickly. They may remain in your attention even when they have little practical effect.",
    },
  },
  novelty: {
    low: {
      title: "You prefer options that have already proved reliable.",
      body: "Familiar choices retain their value through repeated use. A new option needs a clear advantage before it replaces an established preference.",
    },
    leaningLow: {
      title: "You prefer familiarity with occasional variation.",
      body: "Established choices remain useful, though a distinct alternative can attract interest. Change requires a visible reason.",
    },
    balanced: {
      title: "You choose novelty when it offers a clear experience.",
      body: "New options attract measured interest. You are more likely to try them when the difference appears meaningful.",
    },
    leaningHigh: {
      title: "You choose new experiences with little hesitation.",
      body: "Unfamiliar options often receive serious consideration. Prior evidence helps, although curiosity can be sufficient.",
    },
    high: {
      title: "Unfamiliar options hold your attention.",
      body: "New routes and experiences create strong interest. Curiosity may provide enough reason to choose them.",
    },
  },
  rules: {
    low: {
      title: "You question rules that lack a clear purpose.",
      body: "Compliance depends on whether a rule appears reasonable. Rules with no visible connection to safety or fairness receive less authority from you.",
    },
    leaningLow: {
      title: "You treat rules as open to judgment.",
      body: "A rule receives authority from its purpose and context. Weak reasoning makes personal judgment more influential.",
    },
    balanced: {
      title: "You follow rules according to their purpose.",
      body: "Rules that support fairness or safety are treated seriously. Context affects your response when the purpose is unclear.",
    },
    leaningHigh: {
      title: "You usually follow shared standards.",
      body: "Consistent rules make collective settings easier to manage. Exceptions remain possible when circumstances provide a clear reason.",
    },
    high: {
      title: "You follow shared rules even without supervision.",
      body: "Consistent standards help you trust a system. You tend to maintain them when breaking the rule would be easy.",
    },
  },
  decision: {
    low: {
      title: "You compare options carefully before deciding.",
      body: "A decision feels more secure after the alternatives have been examined. Similar choices may therefore require more time than expected.",
    },
    leaningLow: {
      title: "You prefer time to compare similar choices.",
      body: "Relevant differences deserve attention before a decision is settled. Additional time is useful when the alternatives appear close.",
    },
    balanced: {
      title: "You gather enough information to make a sound choice.",
      body: "Relevant differences receive attention, while minor ones are set aside. You tend to decide once the central facts are clear.",
    },
    leaningHigh: {
      title: "You reach decisions with limited comparison.",
      body: "The main requirements guide your choice. Once they are met, further analysis offers little practical value.",
    },
    high: {
      title: "You make routine decisions quickly.",
      body: "An option that meets your main requirements is usually sufficient. Extended comparison has limited value once that point has been reached.",
    },
  },
  conflict: {
    low: {
      title: "You tend to preserve agreement during minor conflict.",
      body: "Adaptation comes easily when disagreement appears costly. Your own preference may receive less attention in these situations.",
    },
    leaningLow: {
      title: "You usually allow minor disagreement to pass.",
      body: "Small differences rarely justify a direct challenge. You are more likely to adapt when the consequence remains limited.",
    },
    balanced: {
      title: "You address disagreement without extending it.",
      body: "A problem is likely to be raised when silence would make it worse. Your approach favours a direct statement and a practical resolution.",
    },
    leaningHigh: {
      title: "You are willing to state disagreement directly.",
      body: "A clear objection may be expressed before the issue becomes larger. Directness is usually limited to the matter under discussion.",
    },
    high: {
      title: "You address conflict early.",
      body: "Direct discussion is preferable to prolonged uncertainty for you. Short-term discomfort may be accepted to prevent lasting resentment.",
    },
  },
};
