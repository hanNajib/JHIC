# Layered Architecture - SMK Negeri 8 Jember Website

## Struktur Folder

```
src/
├── components/           # Presentation Layer
│   ├── ui/              # Reusable UI Components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Section.jsx
│   │   ├── Icon.jsx
│   │   ├── StatCard.jsx
│   │   ├── ProgramCard.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── AnnouncementCard.jsx
│   │   ├── GalleryCard.jsx
│   │   └── index.js
│   ├── sections/        # Section Components
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ProgramsSection.jsx
│   │   ├── ArticlesSection.jsx
│   │   ├── AnnouncementsSection.jsx
│   │   ├── GallerySection.jsx
│   │   └── index.js
│   ├── Navbar.jsx       # Existing components
│   └── Footer.jsx
├── hooks/               # Business Logic Layer
│   ├── useCommon.js     # Common hooks
│   ├── useSchool.js     # School-specific hooks
│   └── index.js
├── stores/              # State Management (sederhana untuk sementara)
│   ├── uiStore.js       # UI state management
│   ├── dataStore.js     # Data state (kosong untuk sementara)
│   └── index.js
├── services/            # Data Layer (kosong untuk sementara)
│   ├── api.js           # API configuration (placeholder)
│   ├── schoolService.js # School API services (placeholder)
│   └── index.js
├── utils/               # Utility Layer
│   └── helpers.js       # Helper functions
├── constants/           # Constants
│   └── schoolData.js    # Static data
└── page/
    ├── HomePage.jsx     # New structured page
    └── Index.jsx        # Original page (backup)
```

## Lapisan Arsitektur

### 1. Presentation Layer (`/components`)
- **UI Components**: Komponen dasar yang dapat digunakan kembali
- **Section Components**: Komponen khusus untuk setiap section halaman
- **Existing Components**: Navbar dan Footer yang sudah ada

### 2. Business Logic Layer (`/hooks`)
- **useCommon.js**: Hook umum seperti useToggle, useLoading, useWindowSize
- **useSchool.js**: Hook khusus untuk data sekolah dengan state management sederhana

### 3. State Management (`/stores`)
- **uiStore.js**: State untuk UI (expanded/collapsed, filters, dll) menggunakan Zustand
- **dataStore.js**: Placeholder untuk state data (kosong untuk sementara)

### 4. Data Layer (`/services`)
- **api.js**: Konfigurasi axios (placeholder kosong)
- **schoolService.js**: API services untuk data sekolah (placeholder kosong)

### 5. Utility Layer (`/utils` & `/constants`)
- **helpers.js**: Fungsi utility umum
- **schoolData.js**: Data dummy statis untuk development

## Keunggulan Arsitektur Ini

### 1. **Separation of Concerns**
- Setiap layer memiliki tanggung jawab yang jelas
- UI terpisah dari business logic
- Data management terpisah dari presentation

### 2. **Reusability**
- Komponen UI dapat digunakan kembali
- Hook dapat digunakan di multiple components
- Utility functions dapat digunakan di mana saja

### 3. **Maintainability**
- Mudah untuk mencari dan mengubah kode
- Testing lebih mudah karena setiap layer terisolasi
- Debugging lebih efisien

### 4. **Scalability**
- Mudah menambah fitur baru
- Mudah mengintegrasikan dengan API
- Mudah menambah state management yang lebih kompleks

## Komponen UI yang Telah Dibuat

### Basic Components
- **Button**: Tombol dengan berbagai variant (primary, secondary, outline)
- **Card**: Container dengan padding, shadow, dan styling yang konsisten
- **Badge**: Label kecil untuk tags dan status
- **Section**: Container untuk section dengan title dan subtitle
- **Icon**: Dynamic icon renderer dengan react-icons

### Specialized Components
- **StatCard**: Kartu untuk statistik sekolah
- **ProgramCard**: Kartu untuk program keahlian
- **ArticleCard**: Kartu untuk artikel
- **AnnouncementCard**: Kartu untuk pengumuman
- **GalleryCard**: Kartu untuk galeri

## Custom Hooks

### useSchool.js
- **useSchoolPrograms()**: Management program keahlian dengan expand/collapse
- **useArticles()**: Management artikel
- **useAnnouncements()**: Management pengumuman
- **useGallery()**: Management galeri dengan filtering
- **useAbout()**: Management section about dengan expand/collapse

### useCommon.js
- **useToggle()**: Hook untuk toggle boolean
- **useLoading()**: Hook untuk loading states
- **useWindowSize()**: Hook untuk responsive behavior
- **useLocalStorage()**: Hook untuk local storage management
- **useDebounce()**: Hook untuk debouncing values

## Penggunaan Package yang Dimaksimalkan

### 1. **React Icons** 
- Centralized di komponen Icon
- Dynamic rendering berdasarkan nama
- Konsisten di seluruh aplikasi

### 2. **Zustand** (minimal untuk UI state)
- UI state management yang sederhana
- Tidak digunakan untuk data dummy (sesuai request)

### 3. **Axios** (placeholder)
- Siap untuk integrasi API
- Interceptors untuk error handling
- Base configuration yang mudah diubah

### 4. **React Router DOM**
- Updated dengan route baru untuk HomePage
- Backup route untuk halaman lama

### 5. **Tailwind CSS**
- Utility classes yang konsisten
- Responsive design yang mudah
- Custom color palette sekolah

## Cara Menggunakan

### 1. Import UI Components
```jsx
import { Button, Card, Badge } from '../components/ui';
```

### 2. Import Section Components
```jsx
import { HeroSection, AboutSection } from '../components/sections';
```

### 3. Import Hooks
```jsx
import { useSchoolPrograms, useArticles } from '../hooks/useSchool';
import { useToggle, useLoading } from '../hooks/useCommon';
```

### 4. Import Constants
```jsx
import { SCHOOL_STATS, SCHOOL_PROGRAMS } from '../constants/schoolData';
```

## Migration dari Kode Lama

1. **HomePage.jsx** menggunakan arsitektur baru
2. **Index.jsx** tetap ada sebagai backup
3. Router di-update untuk menggunakan HomePage sebagai default
4. Route `/old` mengarah ke Index.jsx lama

## Future Development

### 1. API Integration
- Ganti data dummy dengan API calls
- Implementasi error handling
- Loading states untuk async operations

### 2. Advanced State Management
- Tambah data caching
- Optimistic updates
- Real-time data dengan websockets

### 3. Performance Optimization
- Code splitting
- Lazy loading
- Image optimization

### 4. Testing
- Unit tests untuk hooks
- Component testing
- Integration testing

Arsitektur ini memberikan fondasi yang kuat untuk development jangka panjang sambil tetap sederhana untuk penggunaan saat ini dengan data dummy.