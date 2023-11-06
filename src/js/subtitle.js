class Subtitle {
    constructor(container, video, options, events) {
        this.container = container;
        this.video = video;
        this.options = options;
        this.events = events;

        this.init();
    }

    init() {
        this.container.style.padding = '10px';
        this.container.style.borderRadius = '5px';
        this.container.style.fontFamily = 'Arial, sans-serif';
        this.container.style.fontSize = this.options.fontSize;
        this.container.style.bottom = this.options.bottom;
        this.container.style.color = this.options.color;
        this.onTrackChange();
    }

    onTrackChange() {
        if (this.video.textTracks && this.video.textTracks[this.video.textTracks.length - 1]) {
            const track = this.video.textTracks[this.video.textTracks.length - 1];
            track.mode = 'hidden';
            track.oncuechange = () => {
                const cue = track.activeCues[track.activeCues.length - 1];
                this.container.innerHTML = '';
                if (cue) {
                    const template = document.createElement('div');
                    template.appendChild(cue.getCueAsHTML());
                    const trackHtml = template.innerHTML
                        .split(/\r?\n/)
                        .map((item) => `<p style="margin: 0; text-shadow: 5px 5px 10px rgba(0, 0, 0, 1)">${item}</p>`)
                        .join('');
                    this.container.innerHTML = trackHtml;
                }
                this.events.trigger('subtitle_change');
            };
        }
    }

    show() {
        this.container.classList.remove('dplayer-subtitle-hide');
        this.events.trigger('subtitle_show');
    }

    hide() {
        this.container.classList.add('dplayer-subtitle-hide');
        this.events.trigger('subtitle_hide');
    }

    toggle() {
        if (this.container.classList.contains('dplayer-subtitle-hide')) {
            this.show();
        } else {
            this.hide();
        }
    }
}

export default Subtitle;
