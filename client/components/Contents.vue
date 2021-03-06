<template>
  <div class="contents">
    <div class="btn-wrapper">
      <div v-if="!isPlaying" class="play-btn" @click="start()">
        <PlayBtn />
      </div>
      <div v-if="isPlaying" class="stop-btn" @click="stop()">
        <StopBtn />
      </div>
    </div>
    <div class="download-icon" @click="download()">
      <DownloadIcon />
    </div>
    <div class="input-range">
      <input v-model="fitness" type="range" min="1" max="5" @change="$emit('fitness', fitness, index)">
    </div>
    <div class="range-num">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'
import PlayBtn from '@/components/svg/PlayBtn.vue'
import StopBtn from '@/components/svg/StopBtn.vue'
import DownloadIcon from '@/components/svg/DownloadIcon.vue'

export type ElementTrack = {
  channel: number,
  controlChanges: object,
  endOfTrackTicks: number,
  instrument: object,
  notes: {
    name: string,
    duration: number,
    time: number,
    velocity: number
  }[],
  pitchBends: []
}

export default Vue.extend({
  components: {
    PlayBtn,
    StopBtn,
    DownloadIcon
  },
  props: {
    ind: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    counter: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isPlaying: false,
      synths: [] as Object[],
      elementFileName: '' as String,
      fitness: 3 as Number,
      loop: '' as any
    }
  },
  watch: {
    counter () {
      this.fitness = 3
      console.log('hoge')
    }
  },
  methods: {
    start () {
      this.isPlaying = true
      this.playToggle()
    },
    stop () {
      this.isPlaying = false
      this.playToggle()
    },
    playToggle () {
      if (this.isPlaying) {
        this.loop = new Tone.Player('loop/4536.mp3')
        const ind = JSON.parse(JSON.stringify(this.ind))
        const midi = ind
        const now = Tone.now() + 0.5
        midi.tracks.forEach((track: ElementTrack) => {
        // create a synth for each track
          const synth: any = new Tone.Sampler({
            urls: {
              G4: 'sampler/G5.mp3',
              G5: 'sampler/G6.mp3'
            },
            onload: () => {
              synth.volume.value = 0
              this.synths.push(synth)
              // schedule all of the events
              track.notes.forEach((note) => {
                synth.triggerAttackRelease(
                  note.name,
                  note.duration,
                  note.time + now,
                  note.velocity
                )
              })
            }
          }).toDestination()
        })
        this.loop.toDestination().autostart = true
      } else {
        // dispose the synth and make a new one
        while (this.synths.length) {
          const synth = this.synths.shift() as any
          synth.disconnect()
          this.loop.disconnect()
        }
      }
    },
    download () {
      // const audio = document.querySelector('audio')
      const ind = JSON.parse(JSON.stringify(this.ind))
      const midi = new Midi()
      midi.fromJSON(ind)
      const blob = new Blob([Buffer.from(midi.toArray())], { type: 'audio/midi' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'output.midi'
      link.click()
    }
  }
})
</script>

<style scoped lang="scss">
.contents {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #707070;
  border-radius: 10px;
}
input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background-color: #e7e7e7;
  height: 5px;
  width: 100%;
  border-radius: 6px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #6A8791;
    cursor: pointer;
  }
}
.download-icon {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
.input-range {
  width: 100%;
  height: 20px;
  display: grid;
  place-items: center;
}
.range-num {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
