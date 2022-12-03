CREATE DATABASE parking;

CREATE TABLE public.parking (
	id int8 NOT NULL DEFAULT nextval('product_id_seq'::regclass),
	type_transport varchar NULL,
	start_date varchar NULL,
	end_date varchar NULL,
	price varchar NULL
);
