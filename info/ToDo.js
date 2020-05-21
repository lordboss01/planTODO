import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import colors from "./Colors";

const { width, height } = Dimensions.get("window")

export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };

    toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };

    startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        });
    };

    finishEdit = () => {
        this.setState({
            isEditing: false
        });
    };
    controllInput = (text) => {
        this.setState({ toDoValue: text })
    }

    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this.toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.uncompleteCircle]} />
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            style={[
                            styles.text,
                            styles.input,
                            isCompleted ? styles.completeText : styles.uncompleteText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this.controllInput}
                            returnKeyType={"done"}
                            onBlur={this.finishEdit}
                        />
                    ) : (
                            <Text
                                style={[
                                    styles.text,
                                    isCompleted ? styles.completeText : styles.uncompleteText
                                ]}
                            >
                                {text}
                            </Text>)}
                </View>

                {isEditing ?
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this.finishEdit}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✔</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this.startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✖</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        marginRight: 20,
        borderWidth: 3
    },
    text: {
        fontWeight: "500",
        fontSize: 30,
        marginVertical: 10
    },
    completeCircle: {
        borderColor: colors.gray
    },
    uncompleteCircle: {
        borderColor: "#F23657"
    },
    completeText: {
        color: colors.gray,
        textDecorationLine: 'line-through'
    },
    uncompleteText: {
        color: colors.black
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width / 2
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    }
});