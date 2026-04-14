'use client';

import { useEffect, useMemo, useState } from 'react';
import { doshaInfo } from '@/lib/doshaCalculator';

const habits = [
  {
    id: 'oil-pulling',
    title: 'Oil Pulling (Gandusha)',
    description: 'Swish 1 tablespoon of sesame or coconut oil in your mouth for 15-20 minutes upon waking, then spit it out.',
    duration: '20 minutes',
    section: 'morning',
    color: 'border-sky-200 bg-sky-50/40',
    when: 'Morning, before brushing and before food.',
    benefits: 'Supports oral hygiene, fresh breath, and may reduce accumulated kapha in the mouth.',
    steps: ['Take 1 tbsp oil into mouth.', 'Swish gently for 5-10 minutes.', 'Spit into bin and rinse with warm water.'],
  },
  {
    id: 'tongue-scraping',
    title: 'Tongue Scraping (Jihwa Prakshalana)',
    description: 'Use a tongue scraper to gently clean your tongue from back to front each morning.',
    duration: '2 minutes',
    section: 'morning',
    color: 'border-sky-200 bg-sky-50/40',
    when: 'Morning, right after waking.',
    benefits: 'Improves taste perception, supports digestion, and reduces toxins.',
    steps: ['Use copper/stainless scraper.', 'Scrape from back to front 5-7 times.', 'Rinse scraper after each stroke.'],
  },
  {
    id: 'abhyanga',
    title: 'Abhyanga (Self Oil Massage)',
    description: 'Massage warm sesame oil over your entire body before bathing, using long strokes on limbs and circular motions on joints.',
    duration: '15 minutes',
    section: 'morning',
    color: 'border-violet-200 bg-violet-50/40',
    when: 'Before bath, 3-4 times a week.',
    benefits: 'Calms vata, supports circulation, nourishes skin, and improves sleep quality.',
    steps: ['Warm small amount of oil.', 'Massage limbs in long strokes, joints in circles.', 'Wait 15 minutes then bathe.'],
  },
  {
    id: 'nasya',
    title: 'Nasya (Nasal Oil)',
    description: 'Apply 2-3 drops of warm sesame or ghee in each nostril while tilted back.',
    duration: '5 minutes',
    section: 'morning',
    color: 'border-violet-200 bg-violet-50/40',
    when: 'After oral care, before breakfast.',
    benefits: 'Lubricates nasal passages, supports brain clarity, and eases sinus dryness.',
    steps: ['Warm oil slightly.', 'Tilt head back.', 'Add 2-3 drops per nostril and inhale gently.'],
  },
  {
    id: 'warm-water',
    title: 'Warm Water Ritual',
    description: 'Sip warm water slowly to gently activate digestion and hydration.',
    duration: '5 minutes',
    section: 'morning',
    color: 'border-emerald-200 bg-emerald-50/40',
    when: 'Morning and throughout cool hours.',
    benefits: 'Kindles agni, helps gentle detoxification, and supports bowel regularity.',
    steps: ['Warm water until comfortable.', 'Sip slowly for 5 minutes.', 'Avoid icy drinks early morning.'],
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Sit quietly with steady breath to stabilize the mind and emotions.',
    duration: '10 minutes',
    section: 'evening',
    color: 'border-amber-200 bg-amber-50/40',
    when: 'Morning or evening, same time daily.',
    benefits: 'Balances pitta reactivity, supports focus, and builds emotional stability.',
    steps: ['Sit comfortably with straight spine.', 'Set timer for 10-15 minutes.', 'Observe breath and gently return attention.'],
  },
  {
    id: 'early-sleep',
    title: 'Early Sleep Routine',
    description: 'Wind down and sleep before 10:30 PM to support natural repair cycles.',
    duration: '45 minutes',
    section: 'evening',
    color: 'border-amber-200 bg-amber-50/40',
    when: 'Night, 60 minutes before sleep.',
    benefits: 'Supports hormone rhythm, tissue repair, and morning energy.',
    steps: ['Dim lights and avoid screens.', 'Have light dinner 2-3 hours before bed.', 'Sleep at a consistent time.'],
  },
  {
    id: 'digital-sunset',
    title: 'Digital Sunset',
    description: 'Reduce screen exposure after dinner to calm the nervous system.',
    duration: '30 minutes',
    section: 'evening',
    color: 'border-rose-200 bg-rose-50/40',
    when: '1 hour before sleep.',
    benefits: 'Improves melatonin rhythm and sleep quality.',
    steps: ['Set devices aside.', 'Use warm lighting.', 'Prefer reading/journaling.'],
  },
  {
    id: 'gratitude-journal',
    title: 'Gratitude Journal',
    description: 'Write 3 simple reflections to settle emotions and close the day positively.',
    duration: '5 minutes',
    section: 'evening',
    color: 'border-rose-200 bg-rose-50/40',
    when: 'Before bed.',
    benefits: 'Supports emotional balance and calmer sleep onset.',
    steps: ['Write three gratitudes.', 'Note one intention for tomorrow.', 'Take 5 deep breaths.'],
  },
  {
    id: 'light-dinner',
    title: 'Light Dinner Window',
    description: 'Keep dinner lighter and complete it 2-3 hours before bedtime.',
    duration: 'Routine',
    section: 'evening',
    color: 'border-emerald-200 bg-emerald-50/40',
    when: 'Early evening.',
    benefits: 'Improves digestion overnight and reduces morning heaviness.',
    steps: ['Prefer warm cooked foods.', 'Avoid heavy fried late meals.', 'Keep portions moderate.'],
  },
];


export default function HabitsPage() {
  const todayKey = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  const [completed, setCompleted] = useState({});
  const [activeHabit, setActiveHabit] = useState(null);
  const [dominantDosha, setDominantDosha] = useState('vata');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dailyHabits') || '{}');
    setCompleted(saved[todayKey] || {});
  }, [todayKey]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dailyHabits') || '{}');
    saved[todayKey] = completed;
    localStorage.setItem('dailyHabits', JSON.stringify(saved));
  }, [completed, todayKey]);

  useEffect(() => {
    const doshaData = JSON.parse(
      localStorage.getItem('doshaResult') || '{}'
    );
    setDominantDosha(doshaData.dominant || 'vata');
  }, []);

  const completedCount = habits.filter(
    (h) => completed[h.id]
  ).length;

  const progress = (completedCount / habits.length) * 100;

  const grouped = {
    morning: habits.filter((h) => h.section === 'morning'),
    evening: habits.filter((h) => h.section === 'evening'),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Habits Tracker
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Personalized for your{' '}
          <span
            className="font-semibold"
            style={{
              color:
                doshaInfo[dominantDosha]?.color || '#27AE60',
            }}
          >
            {doshaInfo[dominantDosha]?.name || 'Vata'}
          </span>
        </p>
      </div>

      {/* Progress Card */}
      <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-6">
          {/* Progress Ring */}
          <div className="relative h-20 w-20">
            <svg className="h-20 w-20 rotate-[-90deg]">
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="#eee"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="#10B981"
                strokeWidth="6"
                fill="none"
                strokeDasharray={214}
                strokeDashoffset={
                  214 - (214 * progress) / 100
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {completedCount}/{habits.length}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Today’s Progress
            </h2>
            <p className="text-gray-500 text-sm">
              🔥 Keep your streak going
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-10">
        {[
          { id: 'morning', label: '🌅 Morning' },
          { id: 'evening', label: '🌙 Evening' },
        ].map((section) => (
          <section key={section.id}>
            <h3 className="mb-4 text-xl font-bold text-gray-600 flex items-center gap-2">
              {section.label}
            </h3>

            <div className="space-y-4">
              {grouped[section.id].map((habit) => (
                <article
                  key={habit.id}
                  className={`rounded-3xl border p-5 transition cursor-pointer
                  hover:shadow-lg hover:-translate-y-1
                  ${habit.color}
                  ${
                    completed[habit.id]
                      ? 'opacity-60 bg-emerald-50 border-emerald-200'
                      : ''
                  }`}
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-3">
                      {/* Toggle */}
                      <button
                        onClick={() =>
                          setCompleted((prev) => ({
                            ...prev,
                            [habit.id]: !prev[habit.id],
                          }))
                        }
                        className={`mt-1 h-7 w-7 rounded-full border-2 flex items-center justify-center
                        ${
                          completed[habit.id]
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {completed[habit.id] && '✓'}
                      </button>

                      {/* Content */}
                      <div>
                        <h2 className="text-xl font-bold">
                          {habit.title}
                        </h2>

                        <p className="text-gray-600 text-sm mt-1">
                          {habit.description}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-emerald-700">
                          {habit.benefits}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                      ⏱ {habit.duration}
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setActiveHabit(habit)}
                    className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    View Instructions
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal */}
      {activeHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">
                {activeHabit.title}
              </h3>

              <button
                onClick={() => setActiveHabit(null)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              <strong>When:</strong> {activeHabit.when}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              <strong>Benefits:</strong>{' '}
              {activeHabit.benefits}
            </p>

            <h4 className="mt-4 font-semibold">
              Steps
            </h4>

            <ol className="mt-2 list-decimal pl-5 text-sm space-y-1">
              {activeHabit.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}