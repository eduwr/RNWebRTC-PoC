/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  mediaDevices,
  RTCView,
  MediaStream,
  MediaStreamConstraints,
} from 'react-native-webrtc';

const App = (): JSX.Element => {
  const [stream, setStream] = useState<boolean | MediaStream>(false);
  const [streamURL, setStreamURL] = useState('');
  const start = async () => {
    console.log('start');
    console.log('type', typeof stream);

    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({
          video: true,
        });

        if (s && typeof s !== 'boolean') {
          setStream(s);
          console.log('stream URL', s.toURL());
          setStreamURL(s.toURL());
        }
      } catch (e) {
        console.error(e);
      }
    }

    console.log(stream);
  };

  const stop = () => {
    console.log('stop');
    if (stream && stream !== true && stream.release) {
      stream.release();
      setStream(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello World</Text>

        {typeof stream !== 'boolean' && stream ? (
          <>
            <RTCView
              objectFit="cover"
              zOrder={10}
              streamURL={stream.toURL()}
              style={{height: 200, width: 200}}
              mirror
            />
            <Text>{'id: ' + stream.id}</Text>
            <Text>{'url: ' + streamURL}</Text>
          </>
        ) : (
          <Text>no stream</Text>
        )}

        <TouchableOpacity onPress={start}>
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stop}>
          <Text>Stop</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  stream: {
    flex: 1,
    backgroundColor: 'black',
    width: 200,
    height: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
