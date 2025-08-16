import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  dogImg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#ffd900",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
