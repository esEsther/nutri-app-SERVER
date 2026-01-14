DROP TABLE IF EXISTS favoritos cascade;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS rol CASCADE;
DROP TABLE IF EXISTS articulos CASCADE;
DROP TABLE IF EXISTS Recetas CASCADE;


CREATE TABLE articulos (
    id_articulo SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    imagen_url VARCHAR(255),
    contenido VARCHAR(15000)
);


CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);
INSERT INTO rol (rol) VALUES ('usuario') RETURNING *;
INSERT INTO rol (rol) VALUES ('admin') RETURNING *;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasenia VARCHAR(250) NOT NULL,
	id_rol INT REFERENCES rol(id_rol)
);


CREATE TABLE favoritos (
    id_favoritos SERIAL PRIMARY KEY,
    id_articulo INT REFERENCES articulos(id_articulo),
    id_usuario INT REFERENCES usuarios(id_usuario)
);
CREATE TABLE recetasFavoritas (
    id_favoritos SERIAL PRIMARY KEY,
    id_receta INT REFERENCES recetas(id_receta),
    id_usuario INT REFERENCES usuarios(id_usuario)
);

CREATE TABLE  recetas (
    id_receta INT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    imagen_url VARCHAR(255),
    contenido VARCHAR(15000)
);

SELECT * FROM usuarios;
SELECT * FROM rol;
SELECT * FROM articulos;
SELECT * FROM favoritos;
SELECT * FROM recetasFavoritas;
SELECT * FROM recetas;



SELECT *
FROM recetas
ORDER BY id_receta ASC
LIMIT 8;

DELETE FROM recetas
WHERE id_receta IN (
    SELECT id_receta
    FROM recetas
    ORDER BY id_receta ASC
    LIMIT 4
);


INSERT INTO articulos (titulo, imagen_url, contenido) VALUES
(
  'Alimentación equilibrada: bases para una vida saludable',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
  'Una alimentación equilibrada es fundamental para mantener una buena salud a lo largo de la vida. Incluir una variedad de alimentos de todos los grupos —frutas, verduras, proteínas, grasas saludables y carbohidratos complejos— ayuda a cubrir las necesidades nutricionales del organismo y a prevenir enfermedades crónicas.'
),
(
  'La importancia del desayuno en el rendimiento diario',
  'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0',
  'El desayuno aporta la energía necesaria para comenzar el día. Saltarse esta comida puede afectar la concentración, el rendimiento físico y el estado de ánimo. Un desayuno completo debe incluir una fuente de proteínas, fibra y grasas saludables.'
),
(
  'Proteínas: funciones y mejores fuentes alimentarias',
  'https://images.unsplash.com/photo-1543352634-6f8e6a1f66f9',
  'Las proteínas son esenciales para la reparación y crecimiento de los tejidos. Se encuentran en alimentos de origen animal como carnes, huevos y lácteos, así como en fuentes vegetales como legumbres, frutos secos y semillas.'
),
(
  'Grasas saludables: por qué no todas son malas',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'Las grasas saludables, como las monoinsaturadas y poliinsaturadas, cumplen funciones vitales en el organismo. Se pueden encontrar en el aceite de oliva, el aguacate, los frutos secos y el pescado azul.'
),
(
  'Hidratación: cuánta agua necesitamos realmente',
  'https://images.unsplash.com/photo-1502741338009-cac2772e18bc',
  'El agua es esencial para el funcionamiento del cuerpo humano. Mantener una adecuada hidratación ayuda a regular la temperatura corporal, transportar nutrientes y eliminar toxinas. Las necesidades varían según la edad, actividad física y clima.'
),
(
  'Fibra alimentaria y salud digestiva',
  'https://images.unsplash.com/photo-1506806732259-39c2d0268443',
  'La fibra mejora el tránsito intestinal, ayuda a controlar el colesterol y contribuye a la sensación de saciedad. Se encuentra principalmente en frutas, verduras, cereales integrales y legumbres.'
),
(
  'Micronutrientes esenciales: vitaminas y minerales',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'Las vitaminas y minerales participan en múltiples procesos metabólicos. Una dieta variada y equilibrada suele ser suficiente para cubrir las necesidades diarias de micronutrientes.'
),
(
  'Alimentac y sistema inmunológico',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'Una alimentación adecuada fortalece el sistema inmunológico. Nutrientes como la vitamina C, la vitamina D, el zinc y el hierro juegan un papel clave en las defensas del organismo.'
),
(
  'Planificación de comidas: clave para una dieta saludable',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
  'Planificar las comidas permite llevar una alimentación más equilibrada, ahorrar tiempo y reducir el consumo de alimentos ultraprocesados. Dedicar unos minutos a organizar el menú semanal puede marcar la diferencia.'
),
(
  'Mitos comunes sobre la nutrición',
  'https://images.unsplash.com/photo-1494390248081-4e521a5940db',
  'Existen muchos mitos en torno a la nutrición, como eliminar por completo los carbohidratos o demonizar las grasas. Informarse a través de fuentes fiables es fundamental para tomar decisiones saludables.'
);
