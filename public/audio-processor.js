class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = () => {
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
        if (inputChannel) {
            const int16Data = this.floatTo16BitPCM(inputChannel);
            this.port.postMessage(int16Data.buffer, [int16Data.buffer]);
        }
        return true;
    }
}

registerProcessor('audio-processor', AudioProcessor);