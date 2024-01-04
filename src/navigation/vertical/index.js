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
          path: '/pengurus'
        },
        {
          title: 'Anggota',
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
      icon: 'mdi:gear',
      children: [
        {
          title: 'Kas & Bank',
          path: '/kas-bank'
        },
        {
          title: 'Kode Akun',
          path: '/kode-akun'
        },
        {
          title: 'Pengaturan Simpanan',
          path: '/pengaturan/simpanan'
        },
        {
          title: 'Supplier',
          path: '/pengaturan/supplier'
        }
      ]
    }
  ]
}

export default navigation
