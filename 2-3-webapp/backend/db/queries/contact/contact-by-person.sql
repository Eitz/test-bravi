SELECT 
	c.id,
	c.info,
	ct.name as typeName,
	ct.id as type
FROM
	person_contact c
JOIN
	person p ON p.id = c.person_id
JOIN
	person_contact_type ct ON c.type_id = ct.id
WHERE p.id = :person_id ORDER BY ct.precedence DESC;