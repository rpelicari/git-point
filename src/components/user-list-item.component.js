import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import { colors } from 'config';

type Props = {
  user: Object,
  title: any,
  subtitle: string,
  onlyImageNavigate: boolean,
  titleStyle: Object,
  navigation: Object,
  icon: string,
  iconAction: Function,
  noBorderBottom: boolean
};

export const UserListItem = ({
  user,
  title,
  subtitle,
  titleStyle,
  onlyImageNavigate,
  navigation,
  icon,
  noBorderBottom,
  iconAction
}: Props) => {
  const ContainerComponent = iconAction || onlyImageNavigate
    ? View
    : TouchableHighlight;
  const UserComponent = iconAction && !onlyImageNavigate
    ? TouchableOpacity
    : View;
  const ImageContainerComponent = onlyImageNavigate ? TouchableOpacity : View;
  const IconComponent = iconAction ? TouchableOpacity : View;

  return (
    <ContainerComponent
      onPress={() =>
        navigation.navigate(
          user.type === 'User' ? 'Profile' : 'Organization',
          user.type === 'User' ? { user: user } : { organization: user }
        )}
      underlayColor={colors.greyLight}
      style={!noBorderBottom && styles.borderContainer}
    >
      <View style={styles.wrapper}>
        <UserComponent
          style={styles.userInfo}
          onPress={() =>
            navigation.navigate('Profile', {
              user: user
            })}
        >

          <ImageContainerComponent
            onPress={() =>
              navigation.navigate('Profile', {
                user: user
              })}
          >
            <FastImage
              style={styles.avatar}
              source={{
                uri: user.avatar_url,
                priority: FastImage.priority.high
              }}
              onPress={() =>
                navigation.navigate('Profile', {
                  user: user
                })}
            />
          </ImageContainerComponent>

          <View style={styles.titleSubtitleContainer}>
            <Text style={[styles.title, titleStyle && titleStyle]}>
              {title ? title : user.login}
            </Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </UserComponent>

        <IconComponent
          style={styles.iconContainer}
          onPress={() => iconAction(user.login)}
        >
          <Icon
            color={colors.grey}
            size={icon ? 24 : 28}
            name={icon ? icon : 'chevron-right'}
            type={icon && 'octicon'}
          />
        </IconComponent>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  wrapper: {
    padding: 10,
    flexDirection: 'row'
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1
  },
  title: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    marginLeft: 10
  },
  subtitle: {
    color: colors.greyDark,
    fontSize: 12,
    marginTop: 1,
    fontWeight: '600',
    marginLeft: 10
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});
