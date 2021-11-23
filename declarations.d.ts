declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'net' {
  import TcpSockets from 'react-native-tcp-socket';
  export = TcpSockets;
}
