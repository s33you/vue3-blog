<template>
  <div class="music-player">
    <div class="cover">
      <img :src="currentSong.cover" alt="Cover">
    </div>
    <div class="info">
      <h2>{{ currentSong.name }}</h2>
      <p>{{ currentSong.author }}</p>
    </div>
    <div class="controls">
      <button @click="playPreviousSong">←</button>
      <button @click="togglePlayback">{{ isPlaying ? 'play' : '▶' }}</button>
      <button @click="playNextSong">→</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,onUnmounted,computed } from 'vue';
import musiclist from './musiclist'
interface Song {
  name: string;
  author: string;
  cover: string;
  url: string;
}

export default defineComponent({
  name: 'MusicPlayer',
  props: {
    songs: {
      type: Array as () => Song[],
      default:musiclist,
    },
  },
  setup(props) {
    const currentSongIndex = ref(0);
    const isPlaying = ref(false);

    const currentSong = computed(() => props.songs[currentSongIndex.value]);

    const audio = new Audio(currentSong.value.url);

    audio.addEventListener('ended', playNextSong);

    function playSong(index: number) {
      currentSongIndex.value = index;
      audio.src = currentSong.value.url;
      audio.play();
      isPlaying.value = true;
    }

    function playPreviousSong() {
      const newIndex = currentSongIndex.value === 0 ? props.songs.length - 1 : currentSongIndex.value - 1;
      playSong(newIndex);
    }

    function playNextSong() {
      const newIndex = currentSongIndex.value === props.songs.length - 1 ? 0 : currentSongIndex.value + 1;
      playSong(newIndex);
    }

    function togglePlayback() {
      if (isPlaying.value) {
        audio.pause();
      } else {
        audio.play();
      }
      isPlaying.value = !isPlaying.value;
    }

    onUnmounted(() => {
      audio.removeEventListener('ended', playNextSong);
      audio.pause();
    });

    return {
      currentSong,
      isPlaying,
      playPreviousSong,
      playNextSong,
      togglePlayback,
    };
  },
});
</script>

<style lang="scss" scoped>
$primary-color: #2196f3;
$secondary-color: #f44336;

.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  overflow: hidden;

  .cover {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease-in-out;
    }

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover img {
      transform: scale(1.1);
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .info {
    text-align: center;
    padding: 20px;

    h2 {
      font-size: 18px;
      margin-bottom: 5px;
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }

  .controls {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height:60px;
      border: none;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      color: #333;
      font-size: 18px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }

      &:focus {
        outline: none;
      }

      &.previous {
        margin-right: 20px;
      }

      &.next {
        margin-left: 20px;
      }

      &.play-pause {
        width: 50px;
        height: 50px;
        font-size: 24px;
        background-color: $primary-color;
        color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease-in-out;

        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }

      &.play-pause.paused {
        background-color: $secondary-color;

        &:hover {
          background-color: darken($secondary-color, 10%);
        }
      }
    }
  }
}

</style>
