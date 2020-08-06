INSERT INTO item_type (`code`, label) 
SELECT * FROM ( 
	SELECT "paragraph" as code, "Paragraph" as label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;

INSERT INTO item_type (`code`, label) 
SELECT * FROM ( 
	SELECT "image" as code, "Image" as label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;

INSERT INTO item_type (`code`, label) 
SELECT * FROM ( 
	SELECT "video" as code, "Video" as label
) tmp
WHERE NOT EXISTS (
	SELECT code FROM item_type WHERE code = tmp.code
) LIMIT 1;