import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const AVAILABLE_CATEGORIES = [
  'Militaria',
  'Sztuka',
  'Architektura',
  'Medycyna',
  'Prawo',
  'Ekonomia i finanse',
  'IT i cyberbezpieczeństwo',
  'Inżynieria i mechanika',
  'Lotnictwo i kosmos',
  'Marynistyka',
  'Archeologia',
  'Biologia i botanika',
  'Psychologia',
  'Motoryzacja',
  'Gastronomia',
  'Geologia',
  'Astronomia',
  'Chemia',
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleGoToResult = (source: 'camera' | 'gallery') => {
    router.push({
      pathname: '/scan-result',
      params: {
        source,
        categories: JSON.stringify(selectedCategories),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testomat Językowy</Text>
      <Text style={styles.subtitle}>
        Wybierz kategorie zadań i przejdź dalej
      </Text>

      {/* Przycisk otwierający wybór kategorii */}
      <TouchableOpacity
        style={styles.categorySelector}
        onPress={() => setCategoryModalVisible(true)}
      >
        <View>
          <Text style={styles.categoryLabel}>Kategorie</Text>
          <Text style={styles.categoryValue}>
            {selectedCategories.length > 0
              ? `Wybrano: ${selectedCategories.length} (${selectedCategories.join(', ')})`
              : 'Kliknij, aby wybrać kategorie...'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#4b5563" />
      </TouchableOpacity>

      {/* Przycisk wyniku skanowania*/}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => handleGoToResult('camera')}
      >
        <Ionicons name="book" size={24} color="#ffffff" />
        <Text style={styles.primaryButtonText}>Wyniki skanowania</Text>
      </TouchableOpacity>

      {/* Przycisk galerii (tymczasowo przechodzi do wyniku) */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => handleGoToResult('gallery')}
      >
        <Ionicons name="images-outline" size={24} color="#2563eb" />
        <Text style={styles.secondaryButtonText}>Wybierz z galerii</Text>
      </TouchableOpacity>

      {/* Okno (Modal) z listą checkboxów */}
      <Modal
        visible={isCategoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Wybierz kategorie</Text>

            <ScrollView style={styles.checkboxList}>
              {AVAILABLE_CATEGORIES.map((category) => {
                const isChecked = selectedCategories.includes(category);
                return (
                  <TouchableOpacity
                    key={category}
                    style={styles.checkboxRow}
                    onPress={() => toggleCategory(category)}
                  >
                    <Ionicons
                      name={isChecked ? 'checkbox' : 'square-outline'}
                      size={24}
                      color={isChecked ? '#2563eb' : '#6b7280'}
                    />
                    <Text style={styles.checkboxText}>{category}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setCategoryModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Zatwierdź</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: 15,
    color: '#111827',
    maxWidth: 260,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 17,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  checkboxList: {
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  checkboxText: {
    fontSize: 16,
    color: '#1f2937',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});