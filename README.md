# Testomat Językowy – Aplikacja Mobilna

Aplikacja mobilna wspomagająca naukę słownictwa na podstawie zdjęć tekstu z funkcją filtrowania branżowego (np. Militaria, IT, Medycyna) oraz interaktywnym podglądem tłumaczeń na zdjęciu.

## Podział ról i architektura
* **Frontend (`/frontend`):** Mateusz – React Native (Expo)
* **Backend (`/backend`):** Kamil (Task Master) – Python (Flask + SQLite)
* **Moduł OCR i NLP (`/backend/ocr`):** Marcin – Python (OpenCV + rozpoznawanie tekstu)

---

## Kontrakt API (Ustalony format danych)

### 1. Skanowanie zdjęcia: `POST /api/scan`
**Żądanie (Frontend -> Backend):** `multipart/form-data`
* `image`: plik graficzny (`.jpg` / `.png`)
* `target_category`: string (np. `"Militaria"`, `"IT"`, `"Ogólne"`)

**Odpowiedź (Backend -> Frontend):** `200 OK` (`application/json`)
> **Uwaga:** Współrzędne `bbox` (Bounding Box) muszą być **znormalizowane do przedziału `0.0 – 1.0`** (wartość w pikselach podzielona odpowiednio przez szerokość lub wysokość zdjęcia), aby ramki pasowały do każdego ekranu telefonu.

```json
{
  "status": "success",
  "selected_category": "Militaria",
  "detected_category": "Militaria",
  "words": [
    {
      "id": "w_1",
      "original": "infantry",
      "lemma": "infantry",
      "translation": "piechota",
      "category": "Militaria",
      "is_target_category": true,
      "bbox": {
        "x": 0.24,
        "y": 0.41,
        "width": 0.12,
        "height": 0.03
      }
    },
    {
      "id": "w_2",
      "original": "running",
      "lemma": "run",
      "translation": "biegać",
      "category": "Ogólne",
      "is_target_category": false,
      "bbox": {
        "x": 0.45,
        "y": 0.41,
        "width": 0.10,
        "height": 0.03
      }
    }
  ]
}
```

### 2. Zapisanie polubionego słówka: `POST /api/words/like`
**Żądanie (Frontend -> Backend):** `application/json`

```json
{
  "original": "infantry",
  "translation": "piechota",
  "category": "Militaria"
}
```