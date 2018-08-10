SELECT 
	p.id,
	p.name,
	c.info AS contact_info,
	ct.name AS contact_typeName,
	ct.id AS contact_type
FROM
	person p
LEFT JOIN
	person_contact c ON c.id = (
		SELECT 
			pc.id
		FROM
			person_contact pc
		JOIN
			person_contact_type pct ON pc.type_id = pct.id
		WHERE
			pc.person_id = p.id
		ORDER BY pct.precedence DESC
		LIMIT 1
	)
LEFT JOIN
	person_contact_type ct ON c.type_id = ct.id;