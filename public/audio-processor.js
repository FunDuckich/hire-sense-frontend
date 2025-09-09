class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this._silenceThreshold = 0.01;
        this._silenceDurationMs = 2500; // Увеличили для комфортных пауз
        this._lastSoundTime = 0; // Инициализируем нулем
        this._isSpeaking = false;

        this.port.onmessage = (event) => {
            if (event.data === 'STOP') {
                this._isSpeaking = false;
            }
        };
    }

    floatTo16BitPCM(input) {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return output;
    }

    process(inputs) {
        const inputChannel = inputs[0][0];
        if (!inputChannel) return true;

        let rms = 0;
        for (let i = 0; i < inputChannel.length; i++) {
            rms += inputChannel[i] * inputChannel[i];
        }
        rms = Math.sqrt(rms / inputChannel.length);

        const nowMs = currentTime * 1000;
        if (this._lastSoundTime === 0 && this._isSpeaking) {
            this._lastSoundTime = nowMs;
        }

        if (rms > this._silenceThreshold) {
            this._lastSoundTime = nowMs;
            if (!this._isSpeaking) {
                this._isSpeaking = true;
                this.port.postMessage(JSON.stringify({type: 'user_speech_start'}));
            }
        } else {
            if (this._isSpeaking && (nowMs - this._lastSoundTime) > this._silenceDurationMs) {
                this._isSpeaking = false;
                this.port.postMessage(JSON.stringify({type: 'user_speech_end'}));
            }
        }

        if (this._isSpeaking) {
            const int16Data = this.floatTo16BitPCM(inputChannel);
            this.port.postMessage(int16Data.buffer, [int16Data.buffer]);
        }

        return true;
    }
}

registerProcessor('audio-processor', AudioProcessor);