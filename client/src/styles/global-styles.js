import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
export const colors = {
  themeMainColor: '#51C1AB',
  themeMainColorLight: '#7AD9C6',
  themeMainColorLightest: '#AEEEE1',
  themeSecondaryColor: '#A258C5',
  themeSecondaryColorLight: '#BF80DC',
  themeSecondaryColorLightest: '#DCB2F0',
  textColor: '#fff',

  yellow: '#FFFF57',
  red: '#FE5763',
  blue: '#6783F4',
  green: '#54F590',
  purple: '#BD5CF3'
};

export default (globalStyles = StyleSheet.create({
  //Containers
  root: {
    width: width,
    height: height,
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: colors.themeMainColor,
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  headerFillerItem: {
    width: 30,
    height: 30
  },
  contentContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnContentContainer: {
    flexDirection: 'column'
  },
  listContainer: {},
  traitContainer: {
    marginLeft: 15,
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  traitSubContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 15
  },
  achievementsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  threeColumnContainer: {
    justifyContent: 'space-between',
    marginRight: 20,
    flexDirection: 'row'
  },

  //Buttons
  saveButton: {
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    backgroundColor: colors.themeMainColor,
    borderRadius: 8
  },
  iconButton: {},
  floatingButton: {},
  bigButton: {},
  bigAbsoluteButton: {
    bottom: 0,
    marginBottom: 10,
    width: '100%',
    zIndex: 100
  },

  //Text
  headerTitle: {
    fontSize: 32,
    color: colors.textColor,
    fontWeight: '200'
  },
  pageTitle: {
    fontSize: 26,
    color: colors.themeMainColor,
    marginLeft: 10
  },
  subTitle: {},
  listTitle: {},
  listItem: {},
  listTitleSmall: {},
  listItemSmall: {},
  buttonText: {},
  bigButtonText: {},
  breadText: {},
  textInputPlaceholder: {},
  textInputTitle: {},
  traitTitle: {
    color: colors.themeMainColorLight,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 15
  },
  traitText: {},
  quoteText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '200',
    marginLeft: '10%',
    marginRight: '10%'
  },
  authorText: { fontStyle: 'italic', fontWeight: '200', opacity: 0.8 },

  //TextInput
  numberInput: {
    width: 75,
    height: 40,
    borderRadius: 1,
    borderColor: colors.themeMainColorLight,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    width: '80%',
    height: 60,
    fontSize: 22,
    borderRadius: 1,
    borderColor: colors.themeMainColorLight,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F2FEFC'
  },
  titleInput: {},
  notes: {
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#aaa',
    borderRadius: 3,
    borderWidth: 1,
    width: '75%'
  },

  //images
  iconTiny: {},
  iconSmall: {
    width: 30,
    height: 30
  },
  iconMedium: {},
  iconBig: {},
  iconMenu: {},
  badgeSmall: {},
  badgeBig: {}
}));
