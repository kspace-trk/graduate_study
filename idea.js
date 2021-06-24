const 繰り返しが1小節ごとの場合 = [
  {
    time: [0, 0.375, 0.75, 1.125, 1.5, 1.75],
    pitch: [0, 0, -5, -5, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
  {
    time: [2, 2.375, 2.75, 3.125, 3.5, 3.75],
    pitch: [0, 0, -5, -5, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
  {
    time: [4, 4.375, 4.75, 5.125, 5.5, 5.75],
    pitch: [-1, -1, -4, 0, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
  {
    time: [6, 6.375, 6.75, 7.125, 7.5, 7.75],
    pitch: [-1, -1, -4, 0, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
]

const 繰り返しが2小節ごとの場合 = [
  {
    time: [0, 0.375, 0.75, 1.125, 1.5, 1.75, 2, 2.375, 2.75, 3.125, 3.5, 3.75],
    pitch: [0, 0, -5, -5, -1, 1, 0, 0, -5, -5, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
  {
    time: [4, 4.375, 4.75, 5.125, 5.5, 5.75, 6, 6.375, 6.75, 7.125, 7.5, 7.75],
    pitch: [-1, -1, -4, 0, -1, 1, -1, -1, -4, 0, -1, 1],
    duration: [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25],
  },
]

const 曲データ = {
  "notes": [
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 67,
      "name": "G4",
      "ticks": 0,
      "time": 0,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 67,
      "name": "G4",
      "ticks": 72,
      "time": 0.375,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 144,
      "time": 0.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 216,
      "time": 1.125,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 61,
      "name": "C#4",
      "ticks": 288,
      "time": 1.5,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 336,
      "time": 1.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 67,
      "name": "G4",
      "ticks": 384,
      "time": 2,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 67,
      "name": "G4",
      "ticks": 456,
      "time": 2.375,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 528,
      "time": 2.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 600,
      "time": 3.125,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 61,
      "name": "C#4",
      "ticks": 672,
      "time": 3.5,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 720,
      "time": 3.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 66,
      "name": "F#4",
      "ticks": 768,
      "time": 4,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 66,
      "name": "F#4",
      "ticks": 840,
      "time": 4.375,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 912,
      "time": 4.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 984,
      "time": 5.125,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 61,
      "name": "C#4",
      "ticks": 1056,
      "time": 5.5,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 1104,
      "time": 5.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 66,
      "name": "F#4",
      "ticks": 1152,
      "time": 6,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 66,
      "name": "F#4",
      "ticks": 1224,
      "time": 6.375,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 1296,
      "time": 6.75,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 1368,
      "time": 7.125,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 61,
      "name": "C#4",
      "ticks": 1440,
      "time": 7.5,
      "velocity": 0.7874015748031497
    },
    {
      "duration": 0.25,
      "durationTicks": 48,
      "midi": 62,
      "name": "D4",
      "ticks": 1488,
      "time": 7.75,
      "velocity": 0.7874015748031497
    }
  ]
}