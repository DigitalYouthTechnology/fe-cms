const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home',
      path: '/dashboards/analytics/'
    },
    {
      title: 'Pengguna',
      icon: 'mdi:account-group',
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
      icon: 'mdi:clipboard',
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
          title: 'Stok barang',
          path: '/stok-barang'
        },
        {
          title: 'Produksi Barang',
          path: '/produksi-barang'
        }
      ]
    },
    {
      title: 'Pengaturan Umum',
      icon: 'mdi:gear',
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
        }
      ]
    }
  ]
}

export default navigation
