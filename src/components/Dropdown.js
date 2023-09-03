import React, { useRef, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const Dropdown = ({ key, data, onSelect }) => {
  const DropdownButton = useRef()
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(undefined)
  const [dropdownTop, setDropdownTop] = useState(0)

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown()
  }

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h)
    })
    setVisible(true)
  }

  const onItemPress = (item) => {
    setSelected(item.key)
    onSelect(item.value)
    setVisible(false)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.key}</Text>
    </TouchableOpacity>
  )

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType='none'>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(!!selected && selected.key) || key}
      </Text>
      <AntDesign name='down' size={16} color='gray' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '90%',
    left: '5%',
    height: 250,
    overflow: 'auto',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
})

export default Dropdown
