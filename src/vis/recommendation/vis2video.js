import { Animation } from "../../svg"
import { Fade } from "../transitions"
import { Wipe } from "../transitions"

export const fadeTransition = function(chartIndex, container, eventList, animation, animationDelay, pauseDuration, transitionDuration) {
    let fade = new Fade();
    fade.container(container);
    fade.duration(transitionDuration)


}