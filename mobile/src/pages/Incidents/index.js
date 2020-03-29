import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity, ToastAndroid } from 'react-native'

import logoImg from '../../assets/logo.png'

import api from '../../services/api'

import styles from './styles'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    async function loadIncidents() {
        if (loading) return

        if (total > 0 && incidents.length === total) return

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])

        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total}</Text> casos.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.8}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <View style={styles.ongGroup}>
                            <View>
                                <Text style={styles.incidentProperty}>ONG:</Text>
                                <Text style={styles.incidentValue}>{incident.name}</Text>
                            </View>

                            <View>
                                <Text style={styles.incidentProperty}>VALOR:</Text>
                                <Text style={styles.incidentValue}>
                                    {Intl.NumberFormat('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                    }).format(incident.value)}
                                </Text>
                            </View>
                        </View>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>DESCRIÇÂO:</Text>
                        <Text style={styles.incidentValue}>{incident.description}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}