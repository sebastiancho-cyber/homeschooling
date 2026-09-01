-- Nuevo tipo de ejercicio: selección múltiple (puede haber más de una respuesta correcta),
-- distinto de multiple_choice (opción única). config: { options: string[], correctIndices: number[] }.
alter type exercise_type add value 'multiple_response';
