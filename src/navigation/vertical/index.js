const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'iconamoon:home',
      path: '/dashboards/analytics/'
    },
    {
      title: 'Pengguna',
      icon: 'clarity:users-line',
      children: [
        {
          title: 'Pengurus',
          icon: 'mdi:account-multiple',
          path: '/pengurus'
        },
        {
          title: 'Anggota',
          icon: 'mdi:account',
          path: '/anggota'
        }
      ]
    },
    {
      title: 'Rekapitulasi',
      icon: 'mdi:clipboard-outline',
      children: [
        {
          title: 'Jurnal Umum',
          icon: 'mdi:book-open',
          path: '/jurnal-umum'
        }
      ]
    },
    {
      title: 'Manufaktur',
      icon: 'fluent-mdl2:manufacturing',
      children: [
        {
          title: 'Stok Barang Baku',
          path: '/stok-barang-baku'
        },
        {
          title: 'Stok Barang Bantu',
          path: '/stok-barang-bantu'
        },
        {
          title: 'Barang Dalam Proses',
          path: '/barang-dalam-proses'
        },
        {
          title: 'Produksi Barang',
          path: '/produksi-barang'
        }
      ]
    },
    {
      title: 'Pengaturan Umum',
      icon: 'carbon:settings',
      children: [
        {
          title: 'Kas & Bank',
          icon: 'mdi:bank',
          path: '/kas-bank'
        },
        {
          title: 'Kode Akun',
          icon: 'mingcute:paper-fill',
          path: '/kode-akun'
        },
        {
          title: 'Pengaturan Simpanan',
          icon: 'mdi:cog-transfer',
          path: '/pengaturan/simpanan'
        },
        {
          title: 'Supplier',
          icon: 'mdi:cog-transfer',
          path: '/pengaturan/supplier',
        }
      ]
    }
  ]
}

export default navigation
