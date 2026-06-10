-- Agregar categoría hall_of_fame a la tabla fotos
ALTER TABLE fotos DROP CONSTRAINT IF EXISTS fotos_categoria_check;
ALTER TABLE fotos ADD CONSTRAINT fotos_categoria_check 
  CHECK (categoria IN ('torneo','grupo','evento','general','hall_of_fame'));

-- Insertar foto Hall of Fame 2025
INSERT INTO fotos (url, descripcion, categoria)
VALUES (
  'https://raw.githubusercontent.com/gabrielserralta/-la-isla-del-poker/main/hall%20of%20fame.jpeg',
  'Hall of Fame - Campeones 2025: Efe (Verano), Dino (Otoño), Maxi (Invierno), Pedro (Primavera)',
  'hall_of_fame'
);
