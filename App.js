import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import colors from "./info/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import ToDo from './info/ToDo';
import AppLoading from "react-native-splash-screen";
import uuidv1 from "./node_modules/uuid/dist/v1"

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos:{}
  };

  componentDidMount = () => {
    this.loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if (!loadedToDos) {
        <AppLoading/>
    }

    return (

      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Plan<Text style={{ fontWeight: "300", color: "#a7ff83" }}>ToDo</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ flex: 1, height: 300 }}>
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello"} />
          </ScrollView>
        </View>

        <View style={[styles.section, styles.footer, { marginVertical: 0 }]} >
          <TextInput style={[styles.input,
          { borderColor: colors.black }]}
            placeholder={"New ToDo"}
            value={newToDo}
            onChangeText={this.controlNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this.addTodo} />
          <TouchableOpacity style={[styles.addTodo, { backgroundColor: colors.red }]}>
            <Icon name="plus" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
  controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  addTodo = () => {
    const { newToDo } = this.setState;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: '',
          toDos: {
            ...prevState,
            ...newToDoObject
          }
        }

        return { ...newState };
      });
    }
  };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: "#071a52",
    height: 51,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#17b978",
    paddingHorizontal: 64,
    marginTop: 0,
    backgroundColor: "#071a52"
  },
  addlist: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "#0e153a",
    textShadowOffset: { height: 10 },
    backgroundColor: colors.red
  },
  section: {
    alignSelf: "stretch"
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 7,
    marginRight: 8,
    paddingHorizontal: 8
  },
  addTodo: {
    borderRadius: 7,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toDos: {
    alignItems: "center"
  }
});