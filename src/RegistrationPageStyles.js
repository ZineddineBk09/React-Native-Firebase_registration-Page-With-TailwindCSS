import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },

  field: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 11,
    borderWidth: 1,
    marginBottom: 20,
    marginRight: 3,
    paddingLeft: 20,
    gap: 15,
    height: 50,
  },
  label: {
    textAlign: 'right',
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    width: '50%',
    textAlign: 'right',
  },
  endEndorment: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    gap: 5,
    paddingHorizontal: 20,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 30,
  },
})

export default styles
