import pyaudio
import wave

def capture_audio(output_file, duration=None):
    chunk = 1024  
    sample_format = pyaudio.paInt16 
    channels = 1  
    fs = 44100  

    p = pyaudio.PyAudio()  

    print("Recording...")

    stream = p.open(format=sample_format,
                    channels=channels,
                    rate=fs,
                    frames_per_buffer=chunk,
                    input=True)

    frames = [] 
    if duration is None:
        try:
            while True:
                data = stream.read(chunk)
                frames.append(data)
        except KeyboardInterrupt:
            print("Recording stopped by user.")
    else:
        for _ in range(0, int(fs / chunk * duration)):
            data = stream.read(chunk)
            frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()

    print("Finished recording.")

    wf = wave.open(output_file, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(sample_format))
    wf.setframerate(fs)
    wf.writeframes(b''.join(frames))
    wf.close()