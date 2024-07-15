SELECT * FROM mycreds360.users order by ascending;
SELECT * FROM mycreds360.users where mycreds360.users.email = 'devin.sanchez@w3cb.io';
insert into mycreds360.users (email, password, status) SELECT email, password, status FROM mycreds360.users where mycreds360.users.email = 'jay.sanchez@w3cb.io';
update mycreds360.users set email = 'jaypersanchez@gmail.com' where id=220;
update mycreds360.users set password = '$2a$12$yuo3YIZPG611cmX6tgOoOuhSFobK6ZjNZeJqrXnEyhu47qD9APhva' where id=220;
select * from mycreds360.users where email = 'devin.sanchez@w3cb.io' or email = 'jay.sanchez@w3cb.io';
select * from mycreds360.userprofiles where user_id in (240,234);
desc mycreds360.badges;
select * from mycreds360.badges where user_id = 220;
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
select * from mycreds360.users join mycreds360.userprofiles on mycreds360.users.id = mycreds360.userprofiles.user_id where mycreds360.userprofiles.user_id = 234;
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
    u.status,
    a.active_users
FROM
	mycreds360.users u
CROSS JOIN (
    SELECT COUNT(*) AS active_users
    FROM mycreds360.users
    WHERE status = 1
) a
WHERE
    u.status = 1;
    
SELECT 
  up.first_name,
  up.last_name,
  COUNT(CASE WHEN u.status = 1 THEN 1 END) AS active_users,
  COUNT(CASE WHEN u.status = 0 THEN 1 END) AS inactive_users
FROM 
  mycreds360.users u
JOIN 
  mycreds360.userprofiles up ON u.id = up.user_id
WHERE u.id = 220
GROUP BY 
  up.first_name, up.last_name;
    

SELECT 
    COUNT(CASE WHEN u.status = 1 THEN u.id END) AS active_users,
    COUNT(CASE WHEN u.status = 0 THEN u.id END) AS inactive_users
FROM
    mycreds360.users u;

    
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
select * from mycreds360.role_user; 
select * from mycreds360.users join mycreds360.userprofiles on mycreds360.users.id = mycreds360.userprofiles.user_id;
insert into mycreds360.userprofiles (user_id, first_name, last_name, mobile_no, created_at, updated_at) values (234, 'Jay', 'Sanchez', 5555556666, NOW(), NOW());
select * from mycreds360.courses;

select up.id, up.user_id, up.first_name, up.last_name, roles.label, ru.role_id 
from mycreds360.userprofiles up
join mycreds360.role_user ru on up.user_id = ru.user_id
join mycreds360.roles roles on roles.id = ru.role_id
WHERE ru.role_id = 7;

SELECT 
        u.id, 
        u.email, 
        up.first_name, 
        up.last_name, 
        up.mobile_no, 
        up.user_photo, 
        COUNT(DISTINCT b.id) AS no_of_badges,
        COUNT(DISTINCT ac.id) AS no_of_certificates
    FROM 
        mycreds360.users u
    JOIN 
        mycreds360.userprofiles up ON u.id = up.user_id
    JOIN 
        mycreds360.role_user ru ON u.id = ru.user_id
    LEFT JOIN 
        mycreds360.badges b ON u.id = b.user_id
    LEFT JOIN 
        mycreds360.assign_certificate ac ON u.id = ac.user_id 
    WHERE 
        ru.role_id = 7
	GROUP BY 
        u.id, u.email, up.first_name, up.last_name, up.mobile_no, up.user_photo
    ORDER BY up.first_name ASC;  
      
select * from mycreds360.userprofiles up where up.user_id = 234;

insert into mycreds360.badges (course_id, course_name, date_completion, status, reference_id) values();
select * from mycreds360.badges order by mycreds360.badges.course_name;
select * from mycreds360.courses;
desc mycreds360.courses;
select * from mycreds360.courses order by mycreds360.courses.id;
desc mycreds360.newcourses;
select * from mycreds360.newcourses;
alter table mycreds360.courses modify badge varchar(255) null;

desc mycreds360.certificate;
select * from mycreds360.certificate;
desc mycreds360.assign_certificate;
select * from mycreds360.assign_certificate where user_id = 234;

SELECT 
                        up.first_name,
                        up.last_name,
                        COUNT(CASE WHEN u.status = 1 THEN 1 END) AS active_users,
                        COUNT(CASE WHEN u.status = 0 THEN 1 END) AS inactive_users
                        FROM 
                        mycreds360.users u
                        JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                        WHERE u.id = 234
                        GROUP BY 
                        up.first_name, up.last_name;
                        
                        SELECT 
                        up.first_name,
                        up.last_name,
                        COUNT(CASE WHEN u.status = 1 THEN 1 END) AS active_users,
                        COUNT(CASE WHEN u.status = 0 THEN 1 END) AS inactive_users
                        FROM 
                        mycreds360.users u
                        JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                        WHERE u.id = 234
                        GROUP BY 
                        up.first_name, up.last_name;
                        
SELECT 
                        up.first_name,
                        up.last_name,
                        COUNT(CASE WHEN u.status = 1 THEN 1 END) AS active_users,
                        COUNT(CASE WHEN u.status = 0 THEN 1 END) AS inactive_users
                        FROM 
                        mycreds360.users u
                        JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                        WHERE u.id = 234
                        GROUP BY 
                        up.first_name, up.last_name;
                        
                        SELECT 
                        up.first_name,
                        up.last_name
                        FROM 
                        mycreds360.users u
                        JOIN 
                        mycreds360.userprofiles up ON u.id = up.user_id
                        WHERE u.id = 234
                        GROUP BY 
                        up.first_name, up.last_name;
select count(*) from mycreds360.badges;
SELECT 
    DATE_FORMAT(mycreds360.badges.date_completion, '%Y-%m') AS month,
    AVG(DATEDIFF(mycreds360.badges.created_at, mycreds360.badges.date_completion)) AS avg_days_to_issue,
    COUNT(*) AS badges_issued
FROM 
    mycreds360.badges
GROUP BY 
    DATE_FORMAT(mycreds360.badges.date_completion, '%Y-%m')
ORDER BY 
    month;

select 
	id,user_id,institution_name,course_name,total_hours,date_completion,json_values,nft_value,tokenuri,txhash,tokenid 
from 
	mycreds360.assign_certificate 
where user_id = 234;

UPDATE mycreds360.assign_certificate SET institution_name = 'Bennington College Web3 Foundations' WHERE id = 448;
alter table mycreds360.assign_certificate MODIFY nft_value LONGTEXT;
alter table mycreds360.assign_certificate add tokenid longtext;
desc mycreds360.assign_certificate;
select * from mycreds360.userprofiles where user_id = 234;
select * from mycreds360.courses where id = 3;
select p.first_name, p.last_name,  c.course_name, i institution_name
from mycreds360.userprofiles as p, mycreds360.courses as c, mycreds360.institution as i
where p.id = 234 and c.id = 3 and i.id = 33;
