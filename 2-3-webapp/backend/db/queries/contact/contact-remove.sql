DELETE FROM person_contact WHERE person_id = :person_id AND id NOT IN (:id_array);