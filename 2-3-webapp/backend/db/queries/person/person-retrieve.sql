SELECT 
	p.id,
	p.name
FROM
	person p
WHERE
	p.id = :id;