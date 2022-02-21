import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {RouteProp} from '@react-navigation/native';
import {AuthenticatedRoutesParamsList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../../components/Header';
import ArrowBack from '../../assets/svg/arrow_back.svg';
import SendArrow from '../../assets/svg/send_black_24dp 1.svg';
import More from '../../assets/svg/more_horiz_black_24dp 1.svg';
import Attachment from '../../assets/svg/attach_file_black_24dp 1.svg';
import {BACKGROUND_COLOR} from '../../core/color';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
  IMessage,
} from 'react-native-gifted-chat';
import DocumentPicker from 'react-native-document-picker';
import {v4 as uuidv4} from 'uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getUserIdService} from '../../services/userService';

type ChatMessageProps = NativeStackNavigationProp<
  AuthenticatedRoutesParamsList,
  'ChatMessage'
>;

type ChatMessageRouteProp = RouteProp<
  AuthenticatedRoutesParamsList,
  'ChatMessage'
>;

type Props = {
  navigation: ChatMessageProps;
  route: ChatMessageRouteProp;
};

const ChatMessage = ({navigation, route}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState('');
  const [avatar] = useState(null);

  useEffect(() => {
    getUserIdService()
      .then(id => {
        setUserId(id);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, would the meeting still go ahead as on the first day of the month as planned.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Sam Adeyemo',
        },
        image: '',
      },
    ]);
  }, []);

  const handleSend = useCallback((newMessage = []) => {
    const message = [
      {
        _id: uuidv4(),
        text: newMessage[0].text,
        createdAt: newMessage[0].createdAt,
        user: {
          _id: newMessage[0].user._id,
        },
        image: newMessage[0].image,
      },
    ];

    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, message);
    });
  }, []);

  const pickFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err as any)) {
        // If user canceled the document selection
      } else {
        // For Unknown Error

        throw err;
      }
    }
  };

  const ListEmptyView = () => {
    return (
      <View style={styles.listEmpty}>
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>
            To start a conversation, send a message {'\n'} to your contact
          </Text>
        </View>
      </View>
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" animating color="#8661FF" />
      </View>
    );
  };

  const renderBubble = (props: any) => {
    const message_sender_id = props.currentMessage.user._id;

    return (
      <Bubble
        {...props}
        position={message_sender_id == userId ? 'right' : 'left'}
        wrapperStyle={{
          right: {
            backgroundColor: '#316F8A',
            width: 248,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 12,
            marginBottom: 30,
          },

          left: {
            backgroundColor: '#E1EEF4',
            width: 257,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 12,
            marginBottom: 30,
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',
            fontStyle: 'normal',
            fontFamily: 'Poppins',
            fontWeight: 'normal',
            fontSize: 12,
          },

          left: {
            color: '#333333',
            fontStyle: 'normal',
            fontFamily: 'Poppins',
            fontWeight: 'normal',
            fontSize: 12,
          },
        }}
        containerToPreviousStyle={{
          right: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          },
          left: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
        }}
        containerToNextStyle={{
          right: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          },
          left: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
        }}
        containerStyle={{
          right: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          },
          left: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderBottomRightRadius: 25,
          },
        }}
      />
    );
  };

  const renderComposer = (props: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Composer
          {...props}
          placeholderTextColor="rgba(51, 51, 51, 0.51)"
          textInputStyle={styles.textI}
          composerHeight={48}
        />
      </View>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderSend = (props: any) => {
    if (!props.text.trim()) {
      // text box empty
      return (
        <TouchableOpacity onPress={() => pickFile()}>
          <Attachment />
        </TouchableOpacity>
      );
    }
    return (
      <View>
        <Send {...props} disabled={!props.text} containerStyle={styles.send}>
          <SendArrow height={24} width={24} />
        </Send>
      </View>
    );
  };

  const customtInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.contain}
        primaryStyle={styles.primary}
        renderComposer={renderComposer}
        renderSend={renderSend}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="Paul Nathan"
        titleColor="#FFFFFF"
        bgColor="#316F8A"
        leftSvg={<ArrowBack />}
        leftOnPress={() => navigation.goBack()}
        rightSvg={<More />}
        rightOnPress={() => <></>}
      />

      <View style={styles.container}>
        <GiftedChat
          messages={messages as any}
          onSend={newMessage => handleSend(newMessage)}
          user={{
            _id: userId,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          renderAvatar={() => avatar}
          renderInputToolbar={customtInputToolbar}
          placeholder="Write a message. . ."
          renderChatEmpty={ListEmptyView}
          renderLoading={renderLoading}
        />
        {Platform.OS === 'android' && (
          <KeyboardAvoidingView behavior="position" />
        )}
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  contain: {
    backgroundColor: '#F1F1F1',
    padding: 8,
    borderTopColor: 'transparent',
  },

  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Poppins',
    color: '#8C8C8C',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 16,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  send: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    marginBottom: 5,
  },

  textI: {
    color: '#333333',
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
  },

  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
