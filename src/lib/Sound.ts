import Sound from "react-native-sound";

export class SoundPlayer {
  private static music: Sound;
  private static sfx: Sound;

  static stopMusic() {
    try {
      SoundPlayer.music.stop(() => {
        console.log("MusicPlayer: Music stopped");
      });
    } catch (e) {
      console.log("MusicPlayer: No sound playing");
    }
  }

  static playSfx(name: string) {
    Sound.setCategory("Playback");
    SoundPlayer.sfx = new Sound(`${name}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("MusicPlayer: failed to load the sound", { name, error });
        return;
      }

      SoundPlayer.sfx.play((success) => {
        if (success) {
          console.log("MusicPlayer: successfully finished playing sfx", name);
        }
      });
    });
  }

  static playMusic(names: string[], volume = 1, index = 0) {
    Sound.setCategory("Playback");
    SoundPlayer.stopMusic();

    SoundPlayer.music = new Sound(`${names[index]}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("MusicPlayer: failed to load the sound", { names, error });
        return;
      }

      SoundPlayer.music.setVolume(volume);
      SoundPlayer.music.play((success) => {
        if (success) {
          console.log("MusicPlayer: successfully finished playing music", names[index]);

          if (names.length > 1) {
            index = index + 1;

            if (index === names.length) {
              index = 0;
            }

            SoundPlayer.playMusic(names, volume, index + 1);
          }
        }
      });
    });
  }
}
