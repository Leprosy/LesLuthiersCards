import Sound from "react-native-sound";

export class MusicPlayer {
  private static music: Sound;

  static stopMusic() {
    try {
      MusicPlayer.music.stop(() => {
        console.log("MusicPlayer: Music stopped");
      });
    } catch (e) {
      console.log("MusicPlayer: No sound playing");
    }
  }

  static playMusic(names: string[], index = 0) {
    Sound.setCategory("Playback");
    MusicPlayer.stopMusic();

    MusicPlayer.music = new Sound(`${names[index]}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("MusicPlayer: failed to load the sound", { names, error });
        return;
      }

      MusicPlayer.music.play((success) => {
        if (success) {
          console.log("MusicPlayer: successfully finished playing");

          if (names.length > 1) {
            index = index + 1;

            if (index === names.length) {
              index = 0;
            }

            MusicPlayer.playMusic(names, index + 1);
          }
        }
      });
    });
  }
}
