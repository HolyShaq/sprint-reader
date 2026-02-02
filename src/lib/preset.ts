const presetTexts = [
  `Rapid Serial Visual Presentation, or RSVP, is a method of reading where words are shown one at a time in a fixed position on the screen. Because your eyes no longer need to move from word to word, a major source of reading slowdown is removed. This allows your brain to focus entirely on recognizing and understanding each word as it appears.

Most RSVP readers highlight a specific letter in each word called the Optimal Recognition Point, or ORP. This letter is usually slightly left of the center of the word. Research shows that readers recognize words fastest when their eyes are anchored on this point. By keeping the ORP in the same position for every word, the text feels more stable and easier to process at high speeds.

Good RSVP systems also adjust timing instead of showing every word for the same duration. Longer words, punctuation, and sentence breaks are given extra time, while short common words pass more quickly. This mirrors natural reading rhythm and improves comprehension.

As you increase words per minute, your eyes remain still, but your attention sharpens. If reading becomes difficult, slowing down slightly often restores clarity. With practice, RSVP can significantly increase reading speed without sacrificing understanding.`,

  //

  `Attention and working memory play a central role in how quickly you can process written information. Your brain does not read entire sentences at once. Instead, it rapidly recognizes patterns, predicts upcoming words, and fills in gaps based on context. Efficient reading depends on how well these systems cooperate.

When text is presented clearly and consistently, your brain spends less effort decoding and more effort understanding. Reducing visual noise, keeping alignment stable, and maintaining predictable timing all lower cognitive load. This is why clean typography and controlled pacing can dramatically improve reading speed.

Working memory has limits. If information arrives too quickly or unpredictably, comprehension drops. Effective reading systems respect these limits by adding brief pauses at natural boundaries such as commas, periods, and paragraph breaks. These pauses give the brain time to integrate meaning before moving on.

With training, readers learn to trust pattern recognition rather than mentally pronouncing every word. This shift from subvocalization to direct comprehension is one of the key factors behind faster reading. The goal is not to rush, but to match presentation speed with how the brain naturally processes language.`,

  //

  `The idea of reading faster than normal speech has existed for over a century. Early experiments in speed reading began in the late nineteenth and early twentieth centuries, when psychologists started measuring eye movements during reading. They discovered that reading is not a smooth scan, but a series of rapid jumps called saccades, separated by brief stops known as fixations.

In the 1950s and 1960s, speed reading gained popular attention through courses that promised dramatic increases in words per minute. Many of these methods focused on reducing subvocalization and training wider visual spans. While results varied, the research helped clarify which limitations were caused by eye movement and which were caused by cognition.

Advances in display technology later made RSVP possible. Instead of moving the eyes across lines of text, words could be presented in a single location at controlled speeds. This approach removed saccades entirely and allowed precise control over timing, punctuation, and emphasis.

Modern speed reading tools combine decades of research in psychology, typography, and human-computer interaction. Rather than chasing maximum speed alone, current systems focus on balancing pace, comfort, and comprehension, allowing readers to choose speeds that match their goals and attention.`,

  //

  `Speed reading is most effective when speed and comprehension stay in balance. Moving too fast does not usually feel like confusion. Instead, it feels like words are passing by without forming a clear mental structure. Recognizing this sensation early is key to reading efficiently.

One sign that you should slow down is loss of context. You may understand individual words, but the sentence no longer connects to the one before it. Another signal is increased mental effort. If you feel yourself straining, guessing, or rereading in your head, your current pace is likely exceeding your processing capacity.

Physical cues also matter. Excessive blinking, tension, or a drifting gaze can indicate cognitive overload. Effective RSVP reading should feel focused but calm. When the rhythm matches your ability, comprehension feels almost effortless.

Slowing down slightly often produces a large improvement in clarity. A small reduction in words per minute can restore meaning, reduce fatigue, and allow your brain to rebuild context. The goal is not maximum speed, but a sustainable pace where understanding remains intact.`,
];

export const getRandomPreset = () =>
  presetTexts[Math.floor(Math.random() * presetTexts.length)];
