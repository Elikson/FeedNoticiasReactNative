import { View, Text } from 'react-native'
import React from 'react'
import { Card } from '@rneui/base'
import database from '@react-native-firebase/database';

export default function App() {

  const [listaNoticias, setListaNoticias] = React.useState([])

  React.useEffect(() => {
    database()
      .ref('/noticias')
      .on('value', snapshot => {
        const noticias = Object.values(snapshot.val())
        setListaNoticias(noticias)
        console.log('Data: ', noticias);
      });
  }, [])

  return (
    <View style={{ padding: 18 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22 }} >Feed de notícias</Text>

      <View style={{ marginTop: 14 }}>
        {
          listaNoticias.map(data =>
            <Card containerStyle={{ marginTop: 15 }}>
              <Card.Title>{data.categoria}</Card.Title>
              <Card.Divider />
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {data.titulo}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {data.conteudo}
              </Text>
            </Card>)
        }
      </View>

    </View>
  )
}