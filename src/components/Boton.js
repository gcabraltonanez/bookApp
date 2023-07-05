import React from 'react';

const Boton = ({clase, label, funcion, id}) => {
	return (
        <button onClick={() => funcion(id)} type='button' class={clase}>
			{label}
		</button>
	);
};

export default Boton;
