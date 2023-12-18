const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home',
      path: '/dashboards/analytics/'
    },
    {
      title: 'Pengurus',
      icon: 'mdi:account-multiple',
      path: '/pengurus'
    },
    {
      title: 'Anggota',
      icon: 'mdi:account',
      path: '/anggota'
    },
    {
      title: 'Jurnal Umum',
      icon: 'mdi:book-open',
      path: '/jurnal-umum'
    },
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

export default navigation
