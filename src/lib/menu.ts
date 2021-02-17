class Menu {

    obtenerMenu(ROLE: String = 'USUARIO') {

        var menu = [{
                titulo: 'Principal',
                icono: 'mdi mdi-gauge',
                submenu: [
                    { titulo: 'Dashboard', url: '/dashboard' },
                    { titulo: 'ProgressBar', url: '/progress' },
                    { titulo: 'Graficas', url: '/graficas1' },
                    { titulo: 'Promesas', url: '/promesas' },
                    { titulo: 'Rsjx', url: '/rxjs' }
                ]
            },
            {
                titulo: 'Mantenimientos',
                icono: 'mdi mdi-folder-lock-open',
                submenu: [
                    // { titulo: 'Usuarios', url: '/usuarios' },
                    { titulo: 'Hospitales', url: '/hospitales' },
                    { titulo: 'Medicos', url: '/medicos' },
    
                ]
            }
        ];
    
        if (ROLE === 'ADMIN') {
            menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
        }
    
        return menu;
    
    }
}

export default Menu;