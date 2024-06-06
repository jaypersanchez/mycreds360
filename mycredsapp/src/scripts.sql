SELECT * FROM mycreds360.users;
SELECT * FROM mycreds360.users where mycreds360.users.email = 'jaypersanchez@gmail.com';
insert into mycreds360.users (email, password, status) SELECT email, password, status FROM mycreds360.users where mycreds360.users.email = 'admin@admin.com';
update mycreds360.users set email = 'jaypersanchez@gmail.com' where id=220;
update mycreds360.users set password = '$2a$12$yuo3YIZPG611cmX6tgOoOuhSFobK6ZjNZeJqrXnEyhu47qD9APhva' where id=220;
select * from mycreds360.users where email = 'jaypersanchez@gmail.com'
desc mycreds360.userprofiles;
desc mycreds360.badges;
desc mycreds360.institution;
desc mycreds360.certificate;
desc mycreds360.courses;
desc mycreds360.newcourses;
select * from mycreds360.badges;
select * from mycreds360.courses;
select * from mycreds360.roles;
select * from mycreds360.role_user;
SELECT * FROM mycreds360.users JOIN mycreds360.role_user ON mycreds360.users.id = mycreds360.role_user.user_id WHERE mycreds360.users.email = 'jaypersanchez@gmail.com';
SELECT `institution`.`id`,
    `institution`.`institution_name`,
    `institution`.`logo`,
    `institution`.`signature`,
    'institution`.`institution_url',
    `institution`.`created_at`,
    `institution`.`updated_at`
FROM `mycreds360`.`institution`;
select * from mycreds360.institution;
alter table mycreds360.institution ADD COLUMN institution_url VARCHAR(255) NULL;
select * from mycreds360.users join mycreds360.userprofiles on mycreds360.users.id = mycreds360.userprofiles.user_id;
SELECT mycreds360.users.id, 
	mycreds360.users.email, 
    mycreds360.userprofiles.first_name, 
    mycreds360.userprofiles.last_name, 
    mycreds360.userprofiles.mobile_no, 
    mycreds360.userprofiles.user_photo, 
    mycreds360.assign_certificate.user_id,
    mycreds360.badges.user_id
    FROM mycreds360.users JOIN mycreds360.userprofiles ON mycreds360.users.id = mycreds360.userprofiles.user_id
    JOIN mycreds360.badges on mycreds360.users.id = mycreds360.badges.user_id
    JOIN mycreds360.assign_certificate on mycreds360.users.id = mycreds360.assign_certificate.user_id 
    WHERE mycreds360.users.email = 'abinash@zaigoinfotech.com';
    
SELECT 
    u.id, 
    u.email, 
    up.first_name, 
    up.last_name, 
    up.mobile_no, 
    up.user_photo, 
    COUNT(DISTINCT b.id) AS no_of_badges,    -- Assuming there is an identifier `id` in `badges`
    COUNT(DISTINCT ac.id) AS no_of_certificates  -- Assuming there is an identifier `id` in `assign_certificate`
FROM 
    mycreds360.users u
JOIN 
    mycreds360.userprofiles up ON u.id = up.user_id
LEFT JOIN 
    mycreds360.badges b ON u.id = b.user_id
LEFT JOIN 
    mycreds360.assign_certificate ac ON u.id = ac.user_id 
WHERE 
    u.email = 'abinash@zaigoinfotech.com'
GROUP BY 
    u.id, u.email, up.first_name, up.last_name, up.mobile_no, up.user_photo;

    
select * from mycreds360.badges;
select * from mycreds360.role_user 
select * from mycreds360.users join mycreds360.userprofiles on mycreds360.users.id = mycreds360.userprofiles.user_id;
insert into mycreds360.userprofiles (user_id, first_name, last_name, mobile_no, created_at, updated_at) values (220, 'Jayper', 'Sanchez', 5555555555, NOW(), NOW())
select * from mycreds360.courses;