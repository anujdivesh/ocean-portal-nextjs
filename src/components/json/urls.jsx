

  export function get_url(value,id = null){
    switch (value) {
      case 'root_menu':
        return 'https://dev-oceanportal.spc.int/middleware/api/submenu_1/?format=json';
      case 'metadata':
        return 'https://dev-oceanportal.spc.int/middleware/api/webapp_product/'+id+'/';
      case 'layer':
        return 'https://dev-oceanportal.spc.int/middleware/api/layer_web_map/'+id+'/';
      default:
        return 'https://api.example.com/default';
    }
  };