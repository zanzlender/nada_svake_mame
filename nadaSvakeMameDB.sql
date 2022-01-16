--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 14.1 (Ubuntu 14.1-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Donation_history; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Donation_history" (
    id bigint NOT NULL,
    family integer NOT NULL,
    "deliveryDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deliverer integer NOT NULL,
    items json[] NOT NULL,
    "donationDate" timestamp without time zone NOT NULL
);


ALTER TABLE public."Donation_history" OWNER TO nada_svake_mame_admin;

--
-- Name: TABLE "Donation_history"; Type: COMMENT; Schema: public; Owner: nada_svake_mame_admin
--

COMMENT ON TABLE public."Donation_history" IS 'items has the following structure:
items: [
  {
    name: "Item name",
    quantity: 4
  },
  ....
]';


--
-- Name: Donation_history_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Donation_history_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Donation_history_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Donation_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Donation_history_id_seq" OWNED BY public."Donation_history".id;


--
-- Name: Donations_temp; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Donations_temp" (
    id bigint NOT NULL,
    "donationCreatedDate" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    family_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public."Donations_temp" OWNER TO nada_svake_mame_admin;

--
-- Name: Donations_temp_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Donations_temp_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Donations_temp_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Donations_temp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Donations_temp_id_seq" OWNED BY public."Donations_temp".id;


--
-- Name: Donations_temp_items; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Donations_temp_items" (
    donation_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public."Donations_temp_items" OWNER TO nada_svake_mame_admin;

--
-- Name: Families; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Families" (
    id integer NOT NULL,
    surname character varying(255) NOT NULL,
    family_members integer NOT NULL,
    city character varying(255) NOT NULL,
    address character varying(500) NOT NULL,
    members json[],
    last_donated date
);


ALTER TABLE public."Families" OWNER TO nada_svake_mame_admin;

--
-- Name: TABLE "Families"; Type: COMMENT; Schema: public; Owner: nada_svake_mame_admin
--

COMMENT ON TABLE public."Families" IS 'Members has the following structure:
members [
  {
     name: "First name",
     surname: "Last name",
     relationship: ANY [ "Otac", "Majka", "Sin", "Kćer", "Djed", "Pradjed", "Baka", "Prabaka", "Bratić", "Sestrična" ] 
  }, 
  ....
]';


--
-- Name: Families_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Families_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Families_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Families_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Families_id_seq" OWNED BY public."Families".id;


--
-- Name: Item_categories; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Item_categories" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."Item_categories" OWNER TO nada_svake_mame_admin;

--
-- Name: Item_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Item_categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Item_categories_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Item_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Item_categories_id_seq" OWNED BY public."Item_categories".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "dateCreated" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role integer NOT NULL,
    email character varying(255),
    password character varying(1024)
);


ALTER TABLE public."Users" OWNER TO nada_svake_mame_admin;

--
-- Name: Korisnici_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Korisnici_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Korisnici_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Korisnici_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Korisnici_id_seq" OWNED BY public."Users".id;


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Roles" (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."Roles" OWNER TO nada_svake_mame_admin;

--
-- Name: Uloge_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Uloge_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Uloge_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Uloge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Uloge_id_seq" OWNED BY public."Roles".id;


--
-- Name: Warehouse; Type: TABLE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE TABLE public."Warehouse" (
    id bigint NOT NULL,
    name character varying(500) NOT NULL,
    info character varying(1024),
    expiration_date date,
    quantity integer NOT NULL,
    "lastAddedDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    categories text[],
    CONSTRAINT "QuantityGreaterThanZero" CHECK ((quantity >= 0))
);


ALTER TABLE public."Warehouse" OWNER TO nada_svake_mame_admin;

--
-- Name: Warehouse_id_seq; Type: SEQUENCE; Schema: public; Owner: nada_svake_mame_admin
--

CREATE SEQUENCE public."Warehouse_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Warehouse_id_seq" OWNER TO nada_svake_mame_admin;

--
-- Name: Warehouse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nada_svake_mame_admin
--

ALTER SEQUENCE public."Warehouse_id_seq" OWNED BY public."Warehouse".id;


--
-- Name: Donation_history id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donation_history" ALTER COLUMN id SET DEFAULT nextval('public."Donation_history_id_seq"'::regclass);


--
-- Name: Donations_temp id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp" ALTER COLUMN id SET DEFAULT nextval('public."Donations_temp_id_seq"'::regclass);


--
-- Name: Families id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Families" ALTER COLUMN id SET DEFAULT nextval('public."Families_id_seq"'::regclass);


--
-- Name: Item_categories id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Item_categories" ALTER COLUMN id SET DEFAULT nextval('public."Item_categories_id_seq"'::regclass);


--
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Uloge_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Korisnici_id_seq"'::regclass);


--
-- Name: Warehouse id; Type: DEFAULT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Warehouse" ALTER COLUMN id SET DEFAULT nextval('public."Warehouse_id_seq"'::regclass);


--
-- Data for Name: Donation_history; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Donation_history" (id, family, "deliveryDate", deliverer, items, "donationDate") FROM stdin;
1	41	2021-12-14 19:57:26.749781	1	{"{\\"name\\":\\"Voda 0.5L\\",\\"quantity\\":5}","{\\"name\\":\\"Pašteta 200g\\",\\"quantity\\":10}"}	2021-12-12 00:00:00
3	45	2021-12-14 19:58:49.380888	1	{"{\\"name\\":\\"Voda 0.5L\\",\\"quantity\\":51}","{\\"name\\":\\"Pašteta 2200g\\",\\"quantity\\":10}"}	2021-12-12 00:00:00
4	45	2021-10-14 19:58:49.380888	1	{"{\\"name\\":\\"Voda 0.5L\\",\\"quantity\\":51}","{\\"name\\":\\"Pašteta 2200g\\",\\"quantity\\":10}"}	2021-12-12 00:00:00
8	41	2022-01-12 14:41:03.056774	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-11 00:00:00
9	44	2022-01-12 14:41:32.025767	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
10	44	2022-01-12 14:41:40.736668	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-11 00:00:00
11	80	2022-01-12 15:32:02.524765	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-11 00:00:00
12	41	2022-01-12 15:32:19.79607	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
13	80	2022-01-12 15:36:52.397141	1	{"{\\"item_id\\":18,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
14	45	2022-01-12 15:37:13.258641	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
15	47	2022-01-12 15:40:02.83959	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
16	81	2022-01-12 15:45:28.355694	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 1\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Item 2\\"}"}	2022-01-12 00:00:00
17	82	2022-01-12 23:36:25.747324	1	{"{\\"item_id\\":18,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Čips\\"}","{\\"item_id\\":19,\\"quantity\\":0,\\"info\\":null,\\"expiration_date\\":null,\\"categories\\":null,\\"lastAddedDate\\":\\"2022-01-10 23:33:52.058307\\",\\"name\\":\\"Grah u konzervi\\"}","{\\"item_id\\":20,\\"quantity\\":0,\\"info\\":\\"Fina je!\\",\\"expiration_date\\":null,\\"categories\\":[],\\"lastAddedDate\\":\\"2022-01-12 23:09:07.666781\\",\\"name\\":\\"Coca-Cola 1.5L\\"}","{\\"item_id\\":21,\\"quantity\\":0,\\"info\\":\\"300g\\",\\"expiration_date\\":\\"2024-01-17T23:00:00.000Z\\",\\"categories\\":[],\\"lastAddedDate\\":\\"2022-01-12 23:09:43.122324\\",\\"name\\":\\"Napolitanke\\"}","{\\"item_id\\":22,\\"quantity\\":0,\\"info\\":\\"Zewa\\",\\"expiration_date\\":null,\\"categories\\":[],\\"lastAddedDate\\":\\"2022-01-12 23:12:02.064959\\",\\"name\\":\\"WC papir\\"}","{\\"item_id\\":23,\\"quantity\\":0,\\"info\\":\\"5kg cca 50kom\\",\\"expiration_date\\":null,\\"categories\\":[],\\"lastAddedDate\\":\\"2022-01-12 23:12:35.769944\\",\\"name\\":\\"Jabuke\\"}","{\\"item_id\\":24,\\"quantity\\":0,\\"info\\":\\"\\",\\"expiration_date\\":\\"2024-01-09T23:00:00.000Z\\",\\"categories\\":[],\\"lastAddedDate\\":\\"2022-01-12 23:13:12.832297\\",\\"name\\":\\"Konzerva tune\\"}"}	2022-01-12 00:00:00
\.


--
-- Data for Name: Donations_temp; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Donations_temp" (id, "donationCreatedDate", family_id, name) FROM stdin;
\.


--
-- Data for Name: Donations_temp_items; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Donations_temp_items" (donation_id, item_id, quantity) FROM stdin;
\.


--
-- Data for Name: Families; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Families" (id, surname, family_members, city, address, members, last_donated) FROM stdin;
41	iveks	4	Kurmovec	JPB 18	{"{\\"name\\":\\"zan\\",\\"surname\\":\\"Zlender\\",\\"relationship\\":\\"Kćer\\"}","{\\"name\\":\\"Natas\\",\\"surname\\":\\"Zlender\\",\\"relationship\\":\\"Son\\"}"}	\N
44	Lojzek	2	Varaždin	Varaždinska 16	\N	\N
45	Kozmač	5	Varaždin	Djurdjice Rijetkovich 69	\N	\N
47	Felgić	1	Prometheus	Vatroslava Lisinskog 42	\N	\N
80	Lukaso	7	Varaždin	Varaždinska 450	\N	\N
81	Kiklops	4	Zagreb	Zagrebačka 142	{"{\\"name\\":\\"zan\\",\\"surname\\":\\"Zlender\\",\\"relationship\\":\\"Kćer\\"}","{\\"name\\":\\"Natas\\",\\"surname\\":\\"Zlender\\",\\"relationship\\":\\"Son\\"}"}	\N
82	Josmin	2	Virovitica	Klopska 4512	\N	2021-01-12
\.


--
-- Data for Name: Item_categories; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Item_categories" (id, name) FROM stdin;
1	Log
\.


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Roles" (id, name) FROM stdin;
1	Administrator
2	Moderator
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Users" (id, name, surname, "dateCreated", role, email, password) FROM stdin;
1	Zan	Zlender\n	2021-12-14 19:41:00.226685	1	a1zan.zlender@gmail.com	12345678
\.


--
-- Data for Name: Warehouse; Type: TABLE DATA; Schema: public; Owner: nada_svake_mame_admin
--

COPY public."Warehouse" (id, name, info, expiration_date, quantity, "lastAddedDate", categories) FROM stdin;
21	Napolitanke	300g	2024-01-18	0	2022-01-12 23:09:43.122324	{}
23	Jabuke	5kg cca 50kom	\N	0	2022-01-12 23:12:35.769944	{}
24	Konzerva tune		2024-01-10	0	2022-01-12 23:13:12.832297	{}
22	WC papir	Zewa	\N	0	2022-01-12 23:12:02.064959	{}
20	Coca-Cola 1.5L	Fina je!	\N	0	2022-01-12 23:09:07.666781	{}
18	Čips	\N	\N	0	2022-01-10 23:33:52.058307	\N
19	Grah u konzervi	\N	\N	0	2022-01-10 23:33:52.058307	\N
\.


--
-- Name: Donation_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Donation_history_id_seq"', 17, true);


--
-- Name: Donations_temp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Donations_temp_id_seq"', 286, true);


--
-- Name: Families_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Families_id_seq"', 82, true);


--
-- Name: Item_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Item_categories_id_seq"', 6, true);


--
-- Name: Korisnici_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Korisnici_id_seq"', 1, true);


--
-- Name: Uloge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Uloge_id_seq"', 2, true);


--
-- Name: Warehouse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nada_svake_mame_admin
--

SELECT pg_catalog.setval('public."Warehouse_id_seq"', 25, true);


--
-- Name: Item_categories CategoryIsUnique; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Item_categories"
    ADD CONSTRAINT "CategoryIsUnique" UNIQUE (name) INCLUDE (name);


--
-- Name: Donation_history Donation_history_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donation_history"
    ADD CONSTRAINT "Donation_history_pkey" PRIMARY KEY (id);


--
-- Name: Donations_temp_items Donations_temp_items_pk1; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp_items"
    ADD CONSTRAINT "Donations_temp_items_pk1" PRIMARY KEY (item_id, donation_id);


--
-- Name: Donations_temp Donations_temp_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp"
    ADD CONSTRAINT "Donations_temp_pkey" PRIMARY KEY (id);


--
-- Name: Families Families_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Families"
    ADD CONSTRAINT "Families_pkey" PRIMARY KEY (id);


--
-- Name: Item_categories Item_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Item_categories"
    ADD CONSTRAINT "Item_categories_pkey" PRIMARY KEY (id);


--
-- Name: Users Korisnici_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Korisnici_pkey" PRIMARY KEY (id);


--
-- Name: Roles Uloge_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Uloge_pkey" PRIMARY KEY (id);


--
-- Name: Warehouse Warehouse_pkey; Type: CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Warehouse"
    ADD CONSTRAINT "Warehouse_pkey" PRIMARY KEY (id);


--
-- Name: Donations_temp_items Donations_temp_items_Donations_temp_fk1; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp_items"
    ADD CONSTRAINT "Donations_temp_items_Donations_temp_fk1" FOREIGN KEY (donation_id) REFERENCES public."Donations_temp"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Donations_temp_items Donations_temp_items_Warehouse; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp_items"
    ADD CONSTRAINT "Donations_temp_items_Warehouse" FOREIGN KEY (item_id) REFERENCES public."Warehouse"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Donation_history donation_history_families; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donation_history"
    ADD CONSTRAINT donation_history_families FOREIGN KEY (family) REFERENCES public."Families"(id);


--
-- Name: Donation_history donation_history_users; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donation_history"
    ADD CONSTRAINT donation_history_users FOREIGN KEY (deliverer) REFERENCES public."Users"(id);


--
-- Name: Donations_temp donations_temp_families_fk1; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Donations_temp"
    ADD CONSTRAINT donations_temp_families_fk1 FOREIGN KEY (family_id) REFERENCES public."Families"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users users_roles_fk1; Type: FK CONSTRAINT; Schema: public; Owner: nada_svake_mame_admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_roles_fk1 FOREIGN KEY (role) REFERENCES public."Roles"(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;


--
-- PostgreSQL database dump complete
--

