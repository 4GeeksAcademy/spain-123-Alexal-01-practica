export const initialStore = () => {
  return {
    message: null,
    currentPersonaje: null,
    currentPlaneta: null,
    currentNave: null,
    currentContacto: null,
    contactos: [],
    favoritos: [],  
    todos: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    
    case "detalles_personajes":
      return { ...store, currentPersonaje: action.payload };

    
    case "detalles_planeta":
      return { ...store, currentPlaneta: action.payload };

    
    case "detalles_nave":
      return { ...store, currentNave: action.payload };

    
    case "set_contactos":
      return { ...store, contactos: action.payload };

    case "detalles_contacto":
      return { ...store, currentContacto: action.payload };

    case "update_contacto":
      return {
        ...store,
        contactos: store.contactos.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
        currentContacto: action.payload
      };

    case "delete_contacto":
      return {
        ...store,
        contactos: store.contactos.filter(c => c.id !== action.payload),
        currentContacto: null
      };

    
    case "add_favorito":
      if (store.favoritos.find(f => f.uid === action.payload.uid)) {
        return store;
      }
      return { ...store, favoritos: [...store.favoritos, action.payload] };

    case "remove_favorito":
      return {
        ...store,
        favoritos: store.favoritos.filter(f => f.uid !== action.payload.uid)
      };

    default:
      throw Error("Unknown action.");
  }
}