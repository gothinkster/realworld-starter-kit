--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

-- COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: update_changed_column(); Type: FUNCTION; Schema: public; Owner: test
--

CREATE FUNCTION update_changed_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
        BEGIN
            IF (TG_OP = 'UPDATE') THEN
                -- Si on ne fournit pas de nouvelle date
                IF (NEW.changed IS NULL) OR (NEW.changed = OLD.changed) THEN
                    NEW.changed := now();
                    RETURN NEW;
                END IF;
                -- Condition ci-dessous pour si jamais le record a été modifié entre
                -- le début et la fin de (ou pendant) l'exécution du script de synchronisation
                IF (OLD.changed > NEW.changed) THEN
                    NEW.changed := OLD.changed;
                END IF;
            ELSE
                IF (NEW.changed IS NULL) THEN
                    NEW.changed := now();
                    RETURN NEW;
                END IF;
            END IF;
            RETURN NEW;
        END;
        $$;


ALTER FUNCTION public.update_changed_column() OWNER TO test;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: assistant_academicassistant; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_academicassistant (
    id integer NOT NULL,
    thesis_title character varying(255),
    phd_inscription_date date,
    confirmation_test_date date,
    thesis_date date,
    expected_phd_date date,
    remark text,
    inscription character varying(12),
    person_id integer NOT NULL,
    supervisor_id integer
);


ALTER TABLE assistant_academicassistant OWNER TO test;

--
-- Name: assistant_academicassistant_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_academicassistant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_academicassistant_id_seq OWNER TO test;

--
-- Name: assistant_academicassistant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_academicassistant_id_seq OWNED BY assistant_academicassistant.id;


--
-- Name: assistant_assistantdocumentfile; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_assistantdocumentfile (
    id integer NOT NULL,
    assistant_mandate_id integer NOT NULL,
    document_file_id integer NOT NULL
);


ALTER TABLE assistant_assistantdocumentfile OWNER TO test;

--
-- Name: assistant_assistantdocumentfile_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_assistantdocumentfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_assistantdocumentfile_id_seq OWNER TO test;

--
-- Name: assistant_assistantdocumentfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_assistantdocumentfile_id_seq OWNED BY assistant_assistantdocumentfile.id;


--
-- Name: assistant_assistantmandate; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_assistantmandate (
    id integer NOT NULL,
    absences text,
    comment text,
    other_status character varying(50),
    renewal_type character varying(12) NOT NULL,
    external_functions text,
    external_contract character varying(255),
    justification text,
    state character varying(20) NOT NULL,
    tutoring_remark text,
    activities_report_remark text,
    research_percent integer NOT NULL,
    tutoring_percent integer NOT NULL,
    service_activities_percent integer NOT NULL,
    formation_activities_percent integer NOT NULL,
    internships text,
    conferences text,
    publications text,
    awards text,
    framing text,
    remark text,
    degrees text,
    formations text,
    faculty_representation integer NOT NULL,
    institute_representation integer NOT NULL,
    sector_representation integer NOT NULL,
    governing_body_representation integer NOT NULL,
    corsci_representation integer NOT NULL,
    students_service integer NOT NULL,
    infrastructure_mgmt_service integer NOT NULL,
    events_organisation_service integer NOT NULL,
    publishing_field_service integer NOT NULL,
    scientific_jury_service integer NOT NULL,
    appeal character varying(20) NOT NULL,
    special boolean NOT NULL,
    contract_duration character varying(30) NOT NULL,
    contract_duration_fte character varying(30) NOT NULL,
    assistant_id integer NOT NULL,
    service_activities_remark text,
    academic_year_id integer NOT NULL,
    assistant_type character varying(20) NOT NULL,
    end_date date NOT NULL,
    entry_date date NOT NULL,
    fulltime_equivalent numeric(3,2) NOT NULL,
    position_id character varying(12) NOT NULL,
    sap_id character varying(12) NOT NULL,
    scale character varying(3) NOT NULL,
    CONSTRAINT assistant_assistantmandate_corsci_representation_check CHECK ((corsci_representation >= 0)),
    CONSTRAINT assistant_assistantmandate_events_organisation_service_check CHECK ((events_organisation_service >= 0)),
    CONSTRAINT assistant_assistantmandate_faculty_representation_check CHECK ((faculty_representation >= 0)),
    CONSTRAINT assistant_assistantmandate_formation_activities_percent_check CHECK ((formation_activities_percent >= 0)),
    CONSTRAINT assistant_assistantmandate_governing_body_representation_check CHECK ((governing_body_representation >= 0)),
    CONSTRAINT assistant_assistantmandate_infrastructure_mgmt_service_check CHECK ((infrastructure_mgmt_service >= 0)),
    CONSTRAINT assistant_assistantmandate_institute_representation_check CHECK ((institute_representation >= 0)),
    CONSTRAINT assistant_assistantmandate_publishing_field_service_check CHECK ((publishing_field_service >= 0)),
    CONSTRAINT assistant_assistantmandate_research_percent_check CHECK ((research_percent >= 0)),
    CONSTRAINT assistant_assistantmandate_scientific_jury_service_check CHECK ((scientific_jury_service >= 0)),
    CONSTRAINT assistant_assistantmandate_sector_representation_check CHECK ((sector_representation >= 0)),
    CONSTRAINT assistant_assistantmandate_service_activities_percent_check CHECK ((service_activities_percent >= 0)),
    CONSTRAINT assistant_assistantmandate_students_service_check CHECK ((students_service >= 0)),
    CONSTRAINT assistant_assistantmandate_tutoring_percent_check CHECK ((tutoring_percent >= 0))
);


ALTER TABLE assistant_assistantmandate OWNER TO test;

--
-- Name: assistant_assistantmandate_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_assistantmandate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_assistantmandate_id_seq OWNER TO test;

--
-- Name: assistant_assistantmandate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_assistantmandate_id_seq OWNED BY assistant_assistantmandate.id;


--
-- Name: assistant_manager; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_manager (
    id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE assistant_manager OWNER TO test;

--
-- Name: assistant_manager_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_manager_id_seq OWNER TO test;

--
-- Name: assistant_manager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_manager_id_seq OWNED BY assistant_manager.id;


--
-- Name: assistant_mandatestructure; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_mandatestructure (
    id integer NOT NULL,
    assistant_mandate_id integer NOT NULL,
    structure_id integer NOT NULL
);


ALTER TABLE assistant_mandatestructure OWNER TO test;

--
-- Name: assistant_mandatestructures_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_mandatestructures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_mandatestructures_id_seq OWNER TO test;

--
-- Name: assistant_mandatestructures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_mandatestructures_id_seq OWNED BY assistant_mandatestructure.id;


--
-- Name: assistant_message; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_message (
    id integer NOT NULL,
    date timestamp with time zone,
    type character varying(20) NOT NULL,
    academic_year_id integer NOT NULL,
    sender_id integer NOT NULL
);


ALTER TABLE assistant_message OWNER TO test;

--
-- Name: assistant_message_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_message_id_seq OWNER TO test;

--
-- Name: assistant_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_message_id_seq OWNED BY assistant_message.id;


--
-- Name: assistant_review; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_review (
    id integer NOT NULL,
    advice character varying(20) NOT NULL,
    justification text,
    remark text,
    confidential text,
    mandate_id integer NOT NULL,
    changed timestamp with time zone,
    status character varying(15),
    reviewer_id integer
);


ALTER TABLE assistant_review OWNER TO test;

--
-- Name: assistant_review_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_review_id_seq OWNER TO test;

--
-- Name: assistant_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_review_id_seq OWNED BY assistant_review.id;


--
-- Name: assistant_reviewer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_reviewer (
    id integer NOT NULL,
    role character varying(30) NOT NULL,
    person_id integer NOT NULL,
    structure_id integer
);


ALTER TABLE assistant_reviewer OWNER TO test;

--
-- Name: assistant_reviewer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_reviewer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_reviewer_id_seq OWNER TO test;

--
-- Name: assistant_reviewer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_reviewer_id_seq OWNED BY assistant_reviewer.id;


--
-- Name: assistant_settings; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_settings (
    id integer NOT NULL,
    starting_date date NOT NULL,
    ending_date date NOT NULL
);


ALTER TABLE assistant_settings OWNER TO test;

--
-- Name: assistant_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_settings_id_seq OWNER TO test;

--
-- Name: assistant_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_settings_id_seq OWNED BY assistant_settings.id;


--
-- Name: assistant_tutoringlearningunityear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE assistant_tutoringlearningunityear (
    id integer NOT NULL,
    sessions_duration integer,
    sessions_number integer,
    series_number integer,
    face_to_face_duration integer,
    attendees integer,
    preparation_duration integer,
    exams_supervision_duration integer,
    mandate_id integer NOT NULL,
    others_delivery text,
    learning_unit_year_id integer NOT NULL,
    CONSTRAINT assistant_tutoringlearningunit_exams_supervision_duration_check CHECK ((exams_supervision_duration >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_attendees_check CHECK ((attendees >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_face_to_face_duration_check CHECK ((face_to_face_duration >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_preparation_duration_check CHECK ((preparation_duration >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_series_number_check CHECK ((series_number >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_sessions_duration_check CHECK ((sessions_duration >= 0)),
    CONSTRAINT assistant_tutoringlearningunityear_sessions_number_check CHECK ((sessions_number >= 0))
);


ALTER TABLE assistant_tutoringlearningunityear OWNER TO test;

--
-- Name: assistant_tutoringlearningunityear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE assistant_tutoringlearningunityear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assistant_tutoringlearningunityear_id_seq OWNER TO test;

--
-- Name: assistant_tutoringlearningunityear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE assistant_tutoringlearningunityear_id_seq OWNED BY assistant_tutoringlearningunityear.id;


--
-- Name: attribution_attribution; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE attribution_attribution (
    id integer NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    start_date date,
    end_date date,
    function character varying(35),
    learning_unit_year_id integer,
    tutor_id integer NOT NULL,
    score_responsible boolean NOT NULL,
    uuid uuid NOT NULL,
    end_year integer,
    start_year integer
);


ALTER TABLE attribution_attribution OWNER TO test;

--
-- Name: attribution_attribution_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE attribution_attribution_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attribution_attribution_id_seq OWNER TO test;

--
-- Name: attribution_attribution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE attribution_attribution_id_seq OWNED BY attribution_attribution.id;


--
-- Name: attribution_attributioncharge; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE attribution_attributioncharge (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    allocation_charge numeric(6,2),
    attribution_id integer NOT NULL,
    learning_unit_component_id integer NOT NULL,
    external_id character varying(100)
);


ALTER TABLE attribution_attributioncharge OWNER TO test;

--
-- Name: attribution_attributioncharge_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE attribution_attributioncharge_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE attribution_attributioncharge_id_seq OWNER TO test;

--
-- Name: attribution_attributioncharge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE attribution_attributioncharge_id_seq OWNED BY attribution_attributioncharge.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE auth_group OWNER TO test;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_group_id_seq OWNER TO test;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE auth_group_permissions OWNER TO test;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_group_permissions_id_seq OWNER TO test;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE auth_permission OWNER TO test;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_permission_id_seq OWNER TO test;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE auth_user OWNER TO test;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE auth_user_groups OWNER TO test;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_groups_id_seq OWNER TO test;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_id_seq OWNER TO test;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE auth_user_user_permissions OWNER TO test;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_user_user_permissions_id_seq OWNER TO test;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- Name: base_academiccalendar; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_academiccalendar (
    id integer NOT NULL,
    external_id character varying(100),
    title character varying(50),
    description text,
    start_date date,
    end_date date,
    academic_year_id integer NOT NULL,
    changed timestamp with time zone,
    highlight_description character varying(255),
    highlight_shortcut character varying(255),
    highlight_title character varying(255),
    uuid uuid NOT NULL,
    reference character varying(50)
);


ALTER TABLE base_academiccalendar OWNER TO test;

--
-- Name: base_academiccalendar_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_academiccalendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_academiccalendar_id_seq OWNER TO test;

--
-- Name: base_academiccalendar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_academiccalendar_id_seq OWNED BY base_academiccalendar.id;


--
-- Name: base_academicyear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_academicyear (
    id integer NOT NULL,
    external_id character varying(100),
    year integer NOT NULL,
    changed timestamp with time zone,
    end_date date,
    start_date date,
    uuid uuid NOT NULL
);


ALTER TABLE base_academicyear OWNER TO test;

--
-- Name: base_academicyear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_academicyear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_academicyear_id_seq OWNER TO test;

--
-- Name: base_academicyear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_academicyear_id_seq OWNED BY base_academicyear.id;


--
-- Name: base_applicationnotice; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_applicationnotice (
    id integer NOT NULL,
    subject character varying(255) NOT NULL,
    notice text NOT NULL,
    start_publish timestamp with time zone NOT NULL,
    stop_publish timestamp with time zone NOT NULL
);


ALTER TABLE base_applicationnotice OWNER TO test;

--
-- Name: base_applicationnotice_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_applicationnotice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_applicationnotice_id_seq OWNER TO test;

--
-- Name: base_applicationnotice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_applicationnotice_id_seq OWNED BY base_applicationnotice.id;


--
-- Name: base_attribution; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_attribution (
    id integer NOT NULL,
    external_id character varying(100),
    start_date date,
    end_date date,
    function character varying(15),
    tutor_id integer NOT NULL,
    changed timestamp with time zone,
    learning_unit_year_id integer
);


ALTER TABLE base_attribution OWNER TO test;

--
-- Name: base_attribution_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_attribution_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_attribution_id_seq OWNER TO test;

--
-- Name: base_attribution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_attribution_id_seq OWNED BY base_attribution.id;


--
-- Name: base_campus; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_campus (
    id integer NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    name character varying(100),
    organization_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE base_campus OWNER TO test;

--
-- Name: base_campus_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_campus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_campus_id_seq OWNER TO test;

--
-- Name: base_campus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_campus_id_seq OWNED BY base_campus.id;


--
-- Name: base_entity; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_entity (
    id integer NOT NULL,
    organization_id integer
);


ALTER TABLE base_entity OWNER TO test;

--
-- Name: base_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_entity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_entity_id_seq OWNER TO test;

--
-- Name: base_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_entity_id_seq OWNED BY base_entity.id;


--
-- Name: base_entityaddress; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_entityaddress (
    id integer NOT NULL,
    label character varying(20),
    location character varying(255),
    postal_code character varying(20),
    city character varying(255),
    country character varying(255),
    entity_id integer NOT NULL
);


ALTER TABLE base_entityaddress OWNER TO test;

--
-- Name: base_entityaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_entityaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_entityaddress_id_seq OWNER TO test;

--
-- Name: base_entityaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_entityaddress_id_seq OWNED BY base_entityaddress.id;


--
-- Name: base_entitylink; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_entitylink (
    id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    child_id integer NOT NULL,
    parent_id integer NOT NULL
);


ALTER TABLE base_entitylink OWNER TO test;

--
-- Name: base_entitylink_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_entitylink_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_entitylink_id_seq OWNER TO test;

--
-- Name: base_entitylink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_entitylink_id_seq OWNED BY base_entitylink.id;


--
-- Name: base_entitymanager; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_entitymanager (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    person_id integer NOT NULL,
    structure_id integer NOT NULL
);


ALTER TABLE base_entitymanager OWNER TO test;

--
-- Name: base_entitymanager_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_entitymanager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_entitymanager_id_seq OWNER TO test;

--
-- Name: base_entitymanager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_entitymanager_id_seq OWNED BY base_entitymanager.id;


--
-- Name: base_entityversion; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_entityversion (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    acronym character varying(20) NOT NULL,
    entity_type character varying(50) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    entity_id integer NOT NULL
);


ALTER TABLE base_entityversion OWNER TO test;

--
-- Name: base_entityversion_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_entityversion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_entityversion_id_seq OWNER TO test;

--
-- Name: base_entityversion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_entityversion_id_seq OWNED BY base_entityversion.id;


--
-- Name: base_examenrollment; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_examenrollment (
    id integer NOT NULL,
    external_id character varying(100),
    score_draft numeric(4,2),
    score_reencoded numeric(4,2),
    score_final numeric(4,2),
    justification_draft character varying(20),
    justification_reencoded character varying(20),
    justification_final character varying(20),
    learning_unit_enrollment_id integer NOT NULL,
    session_exam_id integer NOT NULL,
    changed timestamp with time zone,
    enrollment_state character varying(20) NOT NULL
);


ALTER TABLE base_examenrollment OWNER TO test;

--
-- Name: base_examenrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_examenrollment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_examenrollment_id_seq OWNER TO test;

--
-- Name: base_examenrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_examenrollment_id_seq OWNED BY base_examenrollment.id;


--
-- Name: base_examenrollmenthistory; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_examenrollmenthistory (
    id integer NOT NULL,
    score_final numeric(4,2),
    justification_final character varying(20),
    modification_date timestamp with time zone NOT NULL,
    exam_enrollment_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE base_examenrollmenthistory OWNER TO test;

--
-- Name: base_examenrollmenthistory_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_examenrollmenthistory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_examenrollmenthistory_id_seq OWNER TO test;

--
-- Name: base_examenrollmenthistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_examenrollmenthistory_id_seq OWNED BY base_examenrollmenthistory.id;


--
-- Name: base_externaloffer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_externaloffer (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    name character varying(150) NOT NULL,
    adhoc boolean NOT NULL,
    "national" boolean NOT NULL,
    domain_id integer NOT NULL,
    grade_type_id integer,
    offer_year_id integer
);


ALTER TABLE base_externaloffer OWNER TO test;

--
-- Name: base_externaloffer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_externaloffer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_externaloffer_id_seq OWNER TO test;

--
-- Name: base_externaloffer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_externaloffer_id_seq OWNED BY base_externaloffer.id;


--
-- Name: base_learningclass; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningclass (
    id integer NOT NULL,
    learning_component_id integer NOT NULL
);


ALTER TABLE base_learningclass OWNER TO test;

--
-- Name: base_learningclass_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningclass_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningclass_id_seq OWNER TO test;

--
-- Name: base_learningclass_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningclass_id_seq OWNED BY base_learningclass.id;


--
-- Name: base_learningclassyear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningclassyear (
    id integer NOT NULL,
    acronym character varying(3) NOT NULL,
    learning_class_id integer NOT NULL,
    learning_component_year_id integer NOT NULL
);


ALTER TABLE base_learningclassyear OWNER TO test;

--
-- Name: base_learningclassyear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningclassyear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningclassyear_id_seq OWNER TO test;

--
-- Name: base_learningclassyear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningclassyear_id_seq OWNED BY base_learningclassyear.id;


--
-- Name: base_learningcomponent; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningcomponent (
    id integer NOT NULL,
    learning_container_id integer NOT NULL
);


ALTER TABLE base_learningcomponent OWNER TO test;

--
-- Name: base_learningcomponent_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningcomponent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningcomponent_id_seq OWNER TO test;

--
-- Name: base_learningcomponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningcomponent_id_seq OWNED BY base_learningcomponent.id;


--
-- Name: base_learningcomponentyear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningcomponentyear (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    acronym character varying(3) NOT NULL,
    type character varying(20) NOT NULL,
    comment character varying(255) NOT NULL,
    learning_component_id integer NOT NULL,
    learning_container_year_id integer NOT NULL
);


ALTER TABLE base_learningcomponentyear OWNER TO test;

--
-- Name: base_learningcomponentyear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningcomponentyear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningcomponentyear_id_seq OWNER TO test;

--
-- Name: base_learningcomponentyear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningcomponentyear_id_seq OWNED BY base_learningcomponentyear.id;


--
-- Name: base_learningcontainer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningcontainer (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE base_learningcontainer OWNER TO test;

--
-- Name: base_learningcontainer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningcontainer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningcontainer_id_seq OWNER TO test;

--
-- Name: base_learningcontainer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningcontainer_id_seq OWNED BY base_learningcontainer.id;


--
-- Name: base_learningcontaineryear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningcontaineryear (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    acronym character varying(10) NOT NULL,
    academic_year_id integer NOT NULL,
    learning_container_id integer NOT NULL
);


ALTER TABLE base_learningcontaineryear OWNER TO test;

--
-- Name: base_learningcontaineryear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningcontaineryear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningcontaineryear_id_seq OWNER TO test;

--
-- Name: base_learningcontaineryear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningcontaineryear_id_seq OWNED BY base_learningcontaineryear.id;


--
-- Name: base_learningunit; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningunit (
    id integer NOT NULL,
    external_id character varying(100),
    acronym character varying(15) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    start_year integer NOT NULL,
    end_year integer,
    changed timestamp with time zone,
    uuid uuid NOT NULL,
    periodicity character varying(20),
    learning_container_id integer
);


ALTER TABLE base_learningunit OWNER TO test;

--
-- Name: base_learningunit_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningunit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningunit_id_seq OWNER TO test;

--
-- Name: base_learningunit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningunit_id_seq OWNED BY base_learningunit.id;


--
-- Name: base_learningunitcomponent; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningunitcomponent (
    id integer NOT NULL,
    external_id character varying(100),
    type character varying(25),
    duration numeric(6,2),
    learning_unit_year_id integer NOT NULL,
    uuid uuid NOT NULL,
    learning_component_year_id integer,
    coefficient_repetition integer
);


ALTER TABLE base_learningunitcomponent OWNER TO test;

--
-- Name: base_learningunitcomponent_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningunitcomponent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningunitcomponent_id_seq OWNER TO test;

--
-- Name: base_learningunitcomponent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningunitcomponent_id_seq OWNED BY base_learningunitcomponent.id;


--
-- Name: base_learningunitcomponentclass; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningunitcomponentclass (
    id integer NOT NULL,
    learning_unit_component_id integer NOT NULL,
    learning_unit_year_id integer NOT NULL
);


ALTER TABLE base_learningunitcomponentclass OWNER TO test;

--
-- Name: base_learningunitcomponentclass_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningunitcomponentclass_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningunitcomponentclass_id_seq OWNER TO test;

--
-- Name: base_learningunitcomponentclass_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningunitcomponentclass_id_seq OWNED BY base_learningunitcomponentclass.id;


--
-- Name: base_learningunitenrollment; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningunitenrollment (
    id integer NOT NULL,
    external_id character varying(100),
    date_enrollment date NOT NULL,
    learning_unit_year_id integer NOT NULL,
    offer_enrollment_id integer NOT NULL,
    changed timestamp with time zone,
    uuid uuid NOT NULL
);


ALTER TABLE base_learningunitenrollment OWNER TO test;

--
-- Name: base_learningunitenrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningunitenrollment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningunitenrollment_id_seq OWNER TO test;

--
-- Name: base_learningunitenrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningunitenrollment_id_seq OWNED BY base_learningunitenrollment.id;


--
-- Name: base_learningunityear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_learningunityear (
    id integer NOT NULL,
    external_id character varying(100),
    acronym character varying(15) NOT NULL,
    title character varying(255) NOT NULL,
    credits numeric(5,2),
    decimal_scores boolean NOT NULL,
    academic_year_id integer NOT NULL,
    learning_unit_id integer NOT NULL,
    changed timestamp with time zone,
    team boolean NOT NULL,
    uuid uuid NOT NULL,
    in_charge boolean NOT NULL,
    vacant boolean NOT NULL,
    type character varying(20),
    learning_container_year_id integer,
    status character varying(20),
    structure_id integer
);


ALTER TABLE base_learningunityear OWNER TO test;

--
-- Name: base_learningunityear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_learningunityear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_learningunityear_id_seq OWNER TO test;

--
-- Name: base_learningunityear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_learningunityear_id_seq OWNED BY base_learningunityear.id;


--
-- Name: base_offer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offer (
    id integer NOT NULL,
    external_id character varying(100),
    title character varying(255) NOT NULL,
    changed timestamp with time zone,
    uuid uuid NOT NULL
);


ALTER TABLE base_offer OWNER TO test;

--
-- Name: base_offer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offer_id_seq OWNER TO test;

--
-- Name: base_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offer_id_seq OWNED BY base_offer.id;


--
-- Name: base_offerenrollment; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offerenrollment (
    id integer NOT NULL,
    external_id character varying(100),
    date_enrollment date NOT NULL,
    offer_year_id integer NOT NULL,
    student_id integer NOT NULL,
    changed timestamp with time zone,
    uuid uuid NOT NULL
);


ALTER TABLE base_offerenrollment OWNER TO test;

--
-- Name: base_offerenrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offerenrollment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offerenrollment_id_seq OWNER TO test;

--
-- Name: base_offerenrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offerenrollment_id_seq OWNED BY base_offerenrollment.id;


--
-- Name: base_offertype; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offertype (
    id integer NOT NULL,
    external_id character varying(100),
    name character varying(255) NOT NULL
);


ALTER TABLE base_offertype OWNER TO test;

--
-- Name: base_offertype_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offertype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offertype_id_seq OWNER TO test;

--
-- Name: base_offertype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offertype_id_seq OWNED BY base_offertype.id;


--
-- Name: base_offeryear; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offeryear (
    id integer NOT NULL,
    external_id character varying(100),
    acronym character varying(15) NOT NULL,
    title character varying(255) NOT NULL,
    academic_year_id integer NOT NULL,
    offer_id integer NOT NULL,
    changed timestamp with time zone,
    parent_id integer,
    grade character varying(20),
    title_international character varying(255),
    title_printable character varying(255),
    title_short character varying(255),
    city character varying(255),
    country_id integer,
    entity_administration_id integer,
    entity_administration_fac_id integer,
    entity_management_id integer,
    entity_management_fac_id integer,
    fax character varying(30),
    location character varying(255),
    phone character varying(30),
    postal_code character varying(20),
    recipient character varying(255),
    campus_id integer,
    grade_type_id integer,
    uuid uuid NOT NULL,
    enrollment_enabled boolean NOT NULL,
    email character varying(254),
    offer_type_id integer
);


ALTER TABLE base_offeryear OWNER TO test;

--
-- Name: base_offeryear_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offeryear_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offeryear_id_seq OWNER TO test;

--
-- Name: base_offeryear_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offeryear_id_seq OWNED BY base_offeryear.id;


--
-- Name: base_offeryearcalendar; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offeryearcalendar (
    id integer NOT NULL,
    external_id character varying(100),
    start_date date,
    end_date date,
    academic_calendar_id integer NOT NULL,
    offer_year_id integer NOT NULL,
    changed timestamp with time zone,
    customized boolean NOT NULL
);


ALTER TABLE base_offeryearcalendar OWNER TO test;

--
-- Name: base_offeryearcalendar_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offeryearcalendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offeryearcalendar_id_seq OWNER TO test;

--
-- Name: base_offeryearcalendar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offeryearcalendar_id_seq OWNED BY base_offeryearcalendar.id;


--
-- Name: base_offeryeardomain; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_offeryeardomain (
    id integer NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    domain_id integer,
    offer_year_id integer,
    uuid uuid NOT NULL
);


ALTER TABLE base_offeryeardomain OWNER TO test;

--
-- Name: base_offeryeardomain_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_offeryeardomain_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_offeryeardomain_id_seq OWNER TO test;

--
-- Name: base_offeryeardomain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_offeryeardomain_id_seq OWNED BY base_offeryeardomain.id;


--
-- Name: base_organization; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_organization (
    id integer NOT NULL,
    external_id character varying(100),
    name character varying(255) NOT NULL,
    acronym character varying(15) NOT NULL,
    changed timestamp with time zone,
    reference character varying(30),
    website character varying(255),
    type character varying(30),
    uuid uuid NOT NULL
);


ALTER TABLE base_organization OWNER TO test;

--
-- Name: base_organization_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_organization_id_seq OWNER TO test;

--
-- Name: base_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_organization_id_seq OWNED BY base_organization.id;


--
-- Name: base_organizationaddress; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_organizationaddress (
    id integer NOT NULL,
    label character varying(20) NOT NULL,
    location character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(255) NOT NULL,
    country_id integer NOT NULL,
    organization_id integer NOT NULL
);


ALTER TABLE base_organizationaddress OWNER TO test;

--
-- Name: base_organizationaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_organizationaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_organizationaddress_id_seq OWNER TO test;

--
-- Name: base_organizationaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_organizationaddress_id_seq OWNED BY base_organizationaddress.id;


--
-- Name: base_person; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_person (
    id integer NOT NULL,
    external_id character varying(100),
    global_id character varying(10),
    gender character varying(1),
    national_id character varying(25),
    first_name character varying(50),
    middle_name character varying(50),
    last_name character varying(50),
    user_id integer,
    email character varying(255),
    changed timestamp with time zone,
    phone character varying(30),
    phone_mobile character varying(30),
    language character varying(30),
    uuid uuid NOT NULL,
    source character varying(25),
    birth_date date,
    employee boolean NOT NULL
);


ALTER TABLE base_person OWNER TO test;

--
-- Name: base_person_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_person_id_seq OWNER TO test;

--
-- Name: base_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_person_id_seq OWNED BY base_person.id;


--
-- Name: base_personaddress; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_personaddress (
    id integer NOT NULL,
    label character varying(20) NOT NULL,
    location character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(255) NOT NULL,
    country_id integer NOT NULL,
    person_id integer NOT NULL,
    external_id character varying(100)
);


ALTER TABLE base_personaddress OWNER TO test;

--
-- Name: base_personaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_personaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_personaddress_id_seq OWNER TO test;

--
-- Name: base_personaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_personaddress_id_seq OWNED BY base_personaddress.id;


--
-- Name: base_programmanager; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_programmanager (
    id integer NOT NULL,
    person_id integer NOT NULL,
    changed timestamp with time zone,
    offer_year_id integer NOT NULL,
    external_id character varying(100)
);


ALTER TABLE base_programmanager OWNER TO test;

--
-- Name: base_programmemanager_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_programmemanager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_programmemanager_id_seq OWNER TO test;

--
-- Name: base_programmemanager_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_programmemanager_id_seq OWNED BY base_programmanager.id;


--
-- Name: base_sessionexam; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_sessionexam (
    id integer NOT NULL,
    external_id character varying(100),
    number_session integer NOT NULL,
    learning_unit_year_id integer NOT NULL,
    changed timestamp with time zone,
    offer_year_id integer
);


ALTER TABLE base_sessionexam OWNER TO test;

--
-- Name: base_sessionexam_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_sessionexam_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_sessionexam_id_seq OWNER TO test;

--
-- Name: base_sessionexam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_sessionexam_id_seq OWNED BY base_sessionexam.id;


--
-- Name: base_sessionexamcalendar; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_sessionexamcalendar (
    id integer NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    number_session integer NOT NULL,
    academic_calendar_id integer NOT NULL
);


ALTER TABLE base_sessionexamcalendar OWNER TO test;

--
-- Name: base_sessionexamcalendar_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_sessionexamcalendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_sessionexamcalendar_id_seq OWNER TO test;

--
-- Name: base_sessionexamcalendar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_sessionexamcalendar_id_seq OWNED BY base_sessionexamcalendar.id;


--
-- Name: base_sessionexamdeadline; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_sessionexamdeadline (
    id integer NOT NULL,
    external_id character varying(100),
    changed timestamp with time zone,
    deadline date NOT NULL,
    deadline_tutor integer,
    number_session integer NOT NULL,
    offer_enrollment_id integer NOT NULL
);


ALTER TABLE base_sessionexamdeadline OWNER TO test;

--
-- Name: base_sessionexamdeadline_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_sessionexamdeadline_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_sessionexamdeadline_id_seq OWNER TO test;

--
-- Name: base_sessionexamdeadline_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_sessionexamdeadline_id_seq OWNED BY base_sessionexamdeadline.id;


--
-- Name: base_structure; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_structure (
    id integer NOT NULL,
    external_id character varying(100),
    acronym character varying(15) NOT NULL,
    title character varying(255) NOT NULL,
    part_of_id integer,
    organization_id integer,
    changed timestamp with time zone,
    type character varying(30)
);


ALTER TABLE base_structure OWNER TO test;

--
-- Name: base_structure_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_structure_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_structure_id_seq OWNER TO test;

--
-- Name: base_structure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_structure_id_seq OWNED BY base_structure.id;


--
-- Name: base_structureaddress; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_structureaddress (
    id integer NOT NULL,
    external_id character varying(100),
    label character varying(20) NOT NULL,
    location character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(255) NOT NULL,
    phone character varying(30),
    fax character varying(255),
    email character varying(255),
    country_id integer NOT NULL,
    structure_id integer NOT NULL
);


ALTER TABLE base_structureaddress OWNER TO test;

--
-- Name: base_structureaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_structureaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_structureaddress_id_seq OWNER TO test;

--
-- Name: base_structureaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_structureaddress_id_seq OWNED BY base_structureaddress.id;


--
-- Name: base_student; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_student (
    id integer NOT NULL,
    external_id character varying(100),
    registration_id character varying(10) NOT NULL,
    person_id integer NOT NULL,
    changed timestamp with time zone,
    uuid uuid NOT NULL
);


ALTER TABLE base_student OWNER TO test;

--
-- Name: base_student_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_student_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_student_id_seq OWNER TO test;

--
-- Name: base_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_student_id_seq OWNED BY base_student.id;


--
-- Name: base_synchronization; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_synchronization (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL
);


ALTER TABLE base_synchronization OWNER TO test;

--
-- Name: base_synchronization_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_synchronization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_synchronization_id_seq OWNER TO test;

--
-- Name: base_synchronization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_synchronization_id_seq OWNED BY base_synchronization.id;


--
-- Name: base_tutor; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE base_tutor (
    id integer NOT NULL,
    external_id character varying(100),
    person_id integer NOT NULL,
    changed timestamp with time zone,
    uuid uuid NOT NULL
);


ALTER TABLE base_tutor OWNER TO test;

--
-- Name: base_tutor_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE base_tutor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base_tutor_id_seq OWNER TO test;

--
-- Name: base_tutor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE base_tutor_id_seq OWNED BY base_tutor.id;


--
-- Name: cms_textlabel; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE cms_textlabel (
    id integer NOT NULL,
    entity character varying(25) NOT NULL,
    label character varying(255) NOT NULL,
    "order" integer NOT NULL,
    published boolean NOT NULL,
    parent_id integer,
    CONSTRAINT cms_textlabel_order_f6785a0f_check CHECK (("order" >= 0))
);


ALTER TABLE cms_textlabel OWNER TO test;

--
-- Name: cms_textlabel_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE cms_textlabel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cms_textlabel_id_seq OWNER TO test;

--
-- Name: cms_textlabel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE cms_textlabel_id_seq OWNED BY cms_textlabel.id;


--
-- Name: cms_translatedtext; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE cms_translatedtext (
    id integer NOT NULL,
    entity character varying(25) NOT NULL,
    reference integer NOT NULL,
    text text,
    language_id integer NOT NULL,
    text_label_id integer
);


ALTER TABLE cms_translatedtext OWNER TO test;

--
-- Name: cms_translatedtext_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE cms_translatedtext_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cms_translatedtext_id_seq OWNER TO test;

--
-- Name: cms_translatedtext_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE cms_translatedtext_id_seq OWNED BY cms_translatedtext.id;


--
-- Name: cms_translatedtextlabel; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE cms_translatedtextlabel (
    id integer NOT NULL,
    label character varying(255) NOT NULL,
    language_id integer NOT NULL,
    text_label_id integer NOT NULL
);


ALTER TABLE cms_translatedtextlabel OWNER TO test;

--
-- Name: cms_translatedtextlabel_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE cms_translatedtextlabel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE cms_translatedtextlabel_id_seq OWNER TO test;

--
-- Name: cms_translatedtextlabel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE cms_translatedtextlabel_id_seq OWNED BY cms_translatedtextlabel.id;


--
-- Name: dissertation_adviser; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_adviser (
    id integer NOT NULL,
    type character varying(3) NOT NULL,
    available_by_email boolean NOT NULL,
    available_by_phone boolean NOT NULL,
    available_at_office boolean NOT NULL,
    comment text NOT NULL,
    person_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_adviser OWNER TO test;

--
-- Name: dissertation_adviser_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_adviser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_adviser_id_seq OWNER TO test;

--
-- Name: dissertation_adviser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_adviser_id_seq OWNED BY dissertation_adviser.id;


--
-- Name: dissertation_dissertation; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertation (
    id integer NOT NULL,
    title character varying(500) NOT NULL,
    status character varying(12) NOT NULL,
    description text,
    active boolean NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    modification_date timestamp with time zone NOT NULL,
    author_id integer NOT NULL,
    offer_year_start_id integer NOT NULL,
    proposition_dissertation_id integer NOT NULL,
    defend_periode character varying(12),
    defend_year integer,
    location_id integer,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertation OWNER TO test;

--
-- Name: dissertation_dissertation_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertation_id_seq OWNER TO test;

--
-- Name: dissertation_dissertation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertation_id_seq OWNED BY dissertation_dissertation.id;


--
-- Name: dissertation_dissertationdocumentfile; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertationdocumentfile (
    id integer NOT NULL,
    dissertation_id integer NOT NULL,
    document_file_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertationdocumentfile OWNER TO test;

--
-- Name: dissertation_dissertationdocumentfile_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertationdocumentfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertationdocumentfile_id_seq OWNER TO test;

--
-- Name: dissertation_dissertationdocumentfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertationdocumentfile_id_seq OWNED BY dissertation_dissertationdocumentfile.id;


--
-- Name: dissertation_dissertationgroup; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertationgroup (
    id integer NOT NULL,
    dissertation_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertationgroup OWNER TO test;

--
-- Name: dissertation_dissertationgroup_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertationgroup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertationgroup_id_seq OWNER TO test;

--
-- Name: dissertation_dissertationgroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertationgroup_id_seq OWNED BY dissertation_dissertationgroup.id;


--
-- Name: dissertation_dissertationlocation; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertationlocation (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertationlocation OWNER TO test;

--
-- Name: dissertation_dissertationlocation_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertationlocation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertationlocation_id_seq OWNER TO test;

--
-- Name: dissertation_dissertationlocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertationlocation_id_seq OWNED BY dissertation_dissertationlocation.id;


--
-- Name: dissertation_dissertationrole; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertationrole (
    id integer NOT NULL,
    status character varying(12) NOT NULL,
    adviser_id integer NOT NULL,
    dissertation_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertationrole OWNER TO test;

--
-- Name: dissertation_dissertationrole_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertationrole_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertationrole_id_seq OWNER TO test;

--
-- Name: dissertation_dissertationrole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertationrole_id_seq OWNED BY dissertation_dissertationrole.id;


--
-- Name: dissertation_dissertationupdate; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_dissertationupdate (
    id integer NOT NULL,
    status_from character varying(12) NOT NULL,
    status_to character varying(12) NOT NULL,
    created timestamp with time zone NOT NULL,
    justification text NOT NULL,
    dissertation_id integer NOT NULL,
    person_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_dissertationupdate OWNER TO test;

--
-- Name: dissertation_dissertationupdate_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_dissertationupdate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_dissertationupdate_id_seq OWNER TO test;

--
-- Name: dissertation_dissertationupdate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_dissertationupdate_id_seq OWNED BY dissertation_dissertationupdate.id;


--
-- Name: dissertation_facultyadviser; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_facultyadviser (
    id integer NOT NULL,
    adviser_id integer NOT NULL,
    offer_id integer NOT NULL
);


ALTER TABLE dissertation_facultyadviser OWNER TO test;

--
-- Name: dissertation_facultyadviser_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_facultyadviser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_facultyadviser_id_seq OWNER TO test;

--
-- Name: dissertation_facultyadviser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_facultyadviser_id_seq OWNED BY dissertation_facultyadviser.id;


--
-- Name: dissertation_offerproposition; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_offerproposition (
    id integer NOT NULL,
    acronym character varying(200) NOT NULL,
    student_can_manage_readers boolean NOT NULL,
    adviser_can_suggest_reader boolean NOT NULL,
    evaluation_first_year boolean NOT NULL,
    validation_commission_exists boolean NOT NULL,
    offer_id integer NOT NULL,
    end_visibility_dissertation date NOT NULL,
    end_visibility_proposition date NOT NULL,
    start_visibility_dissertation date NOT NULL,
    start_visibility_proposition date NOT NULL,
    end_edit_title date NOT NULL,
    end_jury_visibility date NOT NULL,
    start_edit_title date NOT NULL,
    start_jury_visibility date NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_offerproposition OWNER TO test;

--
-- Name: dissertation_offerproposition_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_offerproposition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_offerproposition_id_seq OWNER TO test;

--
-- Name: dissertation_offerproposition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_offerproposition_id_seq OWNED BY dissertation_offerproposition.id;


--
-- Name: dissertation_propositiondissertation; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_propositiondissertation (
    id integer NOT NULL,
    collaboration character varying(12) NOT NULL,
    description text,
    level character varying(12) NOT NULL,
    max_number_student integer NOT NULL,
    title character varying(200) NOT NULL,
    type character varying(12) NOT NULL,
    visibility boolean NOT NULL,
    active boolean NOT NULL,
    created_date timestamp with time zone NOT NULL,
    author_id integer NOT NULL,
    creator_id integer,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_propositiondissertation OWNER TO test;

--
-- Name: dissertation_propositiondissertation_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_propositiondissertation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_propositiondissertation_id_seq OWNER TO test;

--
-- Name: dissertation_propositiondissertation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_propositiondissertation_id_seq OWNED BY dissertation_propositiondissertation.id;


--
-- Name: dissertation_propositiondocumentfile; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_propositiondocumentfile (
    id integer NOT NULL,
    document_file_id integer NOT NULL,
    proposition_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_propositiondocumentfile OWNER TO test;

--
-- Name: dissertation_propositiondocumentfile_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_propositiondocumentfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_propositiondocumentfile_id_seq OWNER TO test;

--
-- Name: dissertation_propositiondocumentfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_propositiondocumentfile_id_seq OWNED BY dissertation_propositiondocumentfile.id;


--
-- Name: dissertation_propositionoffer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_propositionoffer (
    id integer NOT NULL,
    offer_proposition_id integer NOT NULL,
    proposition_dissertation_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_propositionoffer OWNER TO test;

--
-- Name: dissertation_propositionoffer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_propositionoffer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_propositionoffer_id_seq OWNER TO test;

--
-- Name: dissertation_propositionoffer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_propositionoffer_id_seq OWNED BY dissertation_propositionoffer.id;


--
-- Name: dissertation_propositionrole; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE dissertation_propositionrole (
    id integer NOT NULL,
    adviser_id integer NOT NULL,
    proposition_dissertation_id integer NOT NULL,
    status character varying(12) NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE dissertation_propositionrole OWNER TO test;

--
-- Name: dissertation_propositionrole_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE dissertation_propositionrole_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dissertation_propositionrole_id_seq OWNER TO test;

--
-- Name: dissertation_propositionrole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE dissertation_propositionrole_id_seq OWNED BY dissertation_propositionrole.id;

CREATE TABLE internship_affectationgenerationtime (
    id integer NOT NULL,
    start_date_time timestamp with time zone NOT NULL,
    end_date_time timestamp with time zone NOT NULL,
    generated_by character varying(255) NOT NULL,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_affectationgenerationtime OWNER TO test;

--
-- Name: internship_affectationgenerationtime_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_affectationgenerationtime_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_affectationgenerationtime_id_seq OWNER TO test;

--
-- Name: internship_affectationgenerationtime_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_affectationgenerationtime_id_seq OWNED BY internship_affectationgenerationtime.id;


--
-- Name: internship_cohort; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_cohort (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    free_internships_number integer NOT NULL,
    publication_start_date date NOT NULL,
    subscription_start_date date NOT NULL,
    subscription_end_date date NOT NULL
);


ALTER TABLE internship_cohort OWNER TO test;

--
-- Name: internship_cohort_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_cohort_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_cohort_id_seq OWNER TO test;

--
-- Name: internship_cohort_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_cohort_id_seq OWNED BY internship_cohort.id;


--
-- Name: internship_internship; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internship (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    length_in_periods integer NOT NULL,
    cohort_id integer NOT NULL,
    speciality_id integer,
    alternate_speciality_id integer
);


ALTER TABLE internship_internship OWNER TO test;

--
-- Name: internship_internship_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internship_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internship_id_seq OWNER TO test;

--
-- Name: internship_internship_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internship_id_seq OWNED BY internship_internship.id;


--
-- Name: internship_internshipchoice; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipchoice (
    id integer NOT NULL,
    choice integer NOT NULL,
    organization_id integer NOT NULL,
    student_id integer NOT NULL,
    priority boolean NOT NULL,
    speciality_id integer,
    internship_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE internship_internshipchoice OWNER TO test;

--
-- Name: internship_internshipchoice_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipchoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipchoice_id_seq OWNER TO test;

--
-- Name: internship_internshipchoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipchoice_id_seq OWNED BY internship_internshipchoice.id;


--
-- Name: internship_internshipenrollment; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipenrollment (
    id integer NOT NULL,
    internship_offer_id integer NOT NULL,
    period_id integer NOT NULL,
    place_id integer NOT NULL,
    student_id integer NOT NULL,
    internship_id integer NOT NULL
);


ALTER TABLE internship_internshipenrollment OWNER TO test;

--
-- Name: internship_internshipenrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipenrollment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipenrollment_id_seq OWNER TO test;

--
-- Name: internship_internshipenrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipenrollment_id_seq OWNED BY internship_internshipenrollment.id;


--
-- Name: internship_internshipmaster; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipmaster (
    id integer NOT NULL,
    reference character varying(50),
    civility character varying(50),
    type_mastery character varying(50),
    speciality character varying(50),
    organization_id integer,
    first_name character varying(50),
    last_name character varying(50),
    uuid uuid NOT NULL
);


ALTER TABLE internship_internshipmaster OWNER TO test;

--
-- Name: internship_internshipmaster_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipmaster_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipmaster_id_seq OWNER TO test;

--
-- Name: internship_internshipmaster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipmaster_id_seq OWNED BY internship_internshipmaster.id;


--
-- Name: internship_internshipoffer; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipoffer (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    maximum_enrollments integer NOT NULL,
    organization_id integer NOT NULL,
    selectable boolean NOT NULL,
    speciality_id integer,
    master character varying(100),
    uuid uuid NOT NULL,
    internship_id integer,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_internshipoffer OWNER TO test;

--
-- Name: internship_internshipoffer_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipoffer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipoffer_id_seq OWNER TO test;

--
-- Name: internship_internshipoffer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipoffer_id_seq OWNED BY internship_internshipoffer.id;


--
-- Name: internship_internshipspeciality; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipspeciality (
    id integer NOT NULL,
    name character varying(125) NOT NULL,
    learning_unit_id integer NOT NULL,
    mandatory boolean NOT NULL,
    acronym character varying(125) NOT NULL,
    order_position integer NOT NULL,
    uuid uuid NOT NULL,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_internshipspeciality OWNER TO test;

--
-- Name: internship_internshipspeciality_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipspeciality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipspeciality_id_seq OWNER TO test;

--
-- Name: internship_internshipspeciality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipspeciality_id_seq OWNED BY internship_internshipspeciality.id;


--
-- Name: internship_internshipspecialitygroup; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipspecialitygroup (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE internship_internshipspecialitygroup OWNER TO test;

--
-- Name: internship_internshipspecialitygroup_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipspecialitygroup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipspecialitygroup_id_seq OWNER TO test;

--
-- Name: internship_internshipspecialitygroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipspecialitygroup_id_seq OWNED BY internship_internshipspecialitygroup.id;


--
-- Name: internship_internshipspecialitygroupmember; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipspecialitygroupmember (
    id integer NOT NULL,
    group_id integer NOT NULL,
    speciality_id integer NOT NULL
);


ALTER TABLE internship_internshipspecialitygroupmember OWNER TO test;

--
-- Name: internship_internshipspecialitygroupmember_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipspecialitygroupmember_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipspecialitygroupmember_id_seq OWNER TO test;

--
-- Name: internship_internshipspecialitygroupmember_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipspecialitygroupmember_id_seq OWNED BY internship_internshipspecialitygroupmember.id;


--
-- Name: internship_internshipstudentaffectationstat; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipstudentaffectationstat (
    id integer NOT NULL,
    choice character varying(1) NOT NULL,
    cost integer NOT NULL,
    consecutive_month boolean NOT NULL,
    organization_id integer NOT NULL,
    period_id integer NOT NULL,
    speciality_id integer NOT NULL,
    student_id integer NOT NULL,
    type_of_internship character varying(1) NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE internship_internshipstudentaffectationstat OWNER TO test;

--
-- Name: internship_internshipstudentaffectationstat_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipstudentaffectationstat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipstudentaffectationstat_id_seq OWNER TO test;

--
-- Name: internship_internshipstudentaffectationstat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipstudentaffectationstat_id_seq OWNED BY internship_internshipstudentaffectationstat.id;


--
-- Name: internship_internshipstudentinformation; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_internshipstudentinformation (
    id integer NOT NULL,
    location character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    email character varying(255),
    phone_mobile character varying(100),
    person_id integer NOT NULL,
    latitude double precision,
    longitude double precision,
    uuid uuid NOT NULL,
    contest character varying(124) NOT NULL,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_internshipstudentinformation OWNER TO test;

--
-- Name: internship_internshipstudentinformation_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_internshipstudentinformation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_internshipstudentinformation_id_seq OWNER TO test;

--
-- Name: internship_internshipstudentinformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_internshipstudentinformation_id_seq OWNED BY internship_internshipstudentinformation.id;


--
-- Name: internship_organization; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_organization (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    acronym character varying(15) NOT NULL,
    website character varying(255),
    reference character varying(30),
    type character varying(30),
    uuid uuid NOT NULL,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_organization OWNER TO test;

--
-- Name: internship_organization_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_organization_id_seq OWNER TO test;

--
-- Name: internship_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_organization_id_seq OWNED BY internship_organization.id;


--
-- Name: internship_organizationaddress; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_organizationaddress (
    id integer NOT NULL,
    label character varying(20) NOT NULL,
    location character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    organization_id integer NOT NULL,
    latitude double precision,
    longitude double precision,
    uuid uuid NOT NULL
);


ALTER TABLE internship_organizationaddress OWNER TO test;

--
-- Name: internship_organizationaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_organizationaddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_organizationaddress_id_seq OWNER TO test;

--
-- Name: internship_organizationaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_organizationaddress_id_seq OWNED BY internship_organizationaddress.id;


--
-- Name: internship_period; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_period (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    date_start date NOT NULL,
    date_end date NOT NULL,
    uuid uuid NOT NULL,
    cohort_id integer NOT NULL
);


ALTER TABLE internship_period OWNER TO test;

--
-- Name: internship_period_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_period_id_seq OWNER TO test;

--
-- Name: internship_period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_period_id_seq OWNED BY internship_period.id;


--
-- Name: internship_periodinternshipplaces; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE internship_periodinternshipplaces (
    id integer NOT NULL,
    number_places integer NOT NULL,
    internship_offer_id integer NOT NULL,
    period_id integer NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE internship_periodinternshipplaces OWNER TO test;

--
-- Name: internship_periodinternshipplaces_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE internship_periodinternshipplaces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE internship_periodinternshipplaces_id_seq OWNER TO test;

--
-- Name: internship_periodinternshipplaces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE internship_periodinternshipplaces_id_seq OWNED BY internship_periodinternshipplaces.id;


--
-- Name: osis_common_documentfile; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE osis_common_documentfile (
    id integer NOT NULL,
    file_name character varying(100) NOT NULL,
    content_type character varying(50) NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    storage_duration integer NOT NULL,
    file character varying(100) NOT NULL,
    description character varying(50) NOT NULL,
    application_name character varying(100),
    size integer,
    uuid uuid NOT NULL,
    update_by character varying(254) NOT NULL
);


ALTER TABLE osis_common_documentfile OWNER TO test;

--
-- Name: osis_common_documentfile_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE osis_common_documentfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE osis_common_documentfile_id_seq OWNER TO test;

--
-- Name: osis_common_documentfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE osis_common_documentfile_id_seq OWNED BY osis_common_documentfile.id;


--
-- Name: osis_common_messagehistory; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE osis_common_messagehistory (
    id integer NOT NULL,
    subject character varying(255) NOT NULL,
    content_txt text NOT NULL,
    content_html text NOT NULL,
    receiver_id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    reference character varying(100),
    show_to_user boolean NOT NULL,
    read_by_user boolean NOT NULL
);


ALTER TABLE osis_common_messagehistory OWNER TO test;

--
-- Name: osis_common_messagehistory_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE osis_common_messagehistory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE osis_common_messagehistory_id_seq OWNER TO test;

--
-- Name: osis_common_messagehistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE osis_common_messagehistory_id_seq OWNED BY osis_common_messagehistory.id;


--
-- Name: osis_common_messagetemplate; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE osis_common_messagetemplate (
    id integer NOT NULL,
    reference character varying(50) NOT NULL,
    subject character varying(255) NOT NULL,
    template text NOT NULL,
    format character varying(15) NOT NULL,
    language character varying(30) NOT NULL
);


ALTER TABLE osis_common_messagetemplate OWNER TO test;

--
-- Name: osis_common_messagetemplate_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE osis_common_messagetemplate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE osis_common_messagetemplate_id_seq OWNER TO test;

--
-- Name: osis_common_messagetemplate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE osis_common_messagetemplate_id_seq OWNED BY osis_common_messagetemplate.id;


--
-- Name: osis_common_queueexception; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE osis_common_queueexception (
    id integer NOT NULL,
    queue_name character varying(255) NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    message jsonb,
    exception_title character varying(255) NOT NULL,
    exception text NOT NULL
);


ALTER TABLE osis_common_queueexception OWNER TO test;

--
-- Name: osis_common_queueexception_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE osis_common_queueexception_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE osis_common_queueexception_id_seq OWNER TO test;

--
-- Name: osis_common_queueexception_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE osis_common_queueexception_id_seq OWNED BY osis_common_queueexception.id;


--
-- Name: reference_continent; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_continent (
    id integer NOT NULL,
    code character varying(2) NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE reference_continent OWNER TO test;

--
-- Name: reference_continent_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_continent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_continent_id_seq OWNER TO test;

--
-- Name: reference_continent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_continent_id_seq OWNED BY reference_continent.id;


--
-- Name: reference_country; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_country (
    id integer NOT NULL,
    iso_code character varying(2) NOT NULL,
    name character varying(80) NOT NULL,
    nationality character varying(80),
    european_union boolean NOT NULL,
    dialing_code character varying(3),
    cref_code character varying(3),
    continent_id integer,
    currency_id integer,
    external_id character varying(100),
    uuid uuid NOT NULL
);


ALTER TABLE reference_country OWNER TO test;

--
-- Name: reference_country_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_country_id_seq OWNER TO test;

--
-- Name: reference_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_country_id_seq OWNED BY reference_country.id;


--
-- Name: reference_currency; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_currency (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    code character varying(4),
    symbol character varying(6)
);


ALTER TABLE reference_currency OWNER TO test;

--
-- Name: reference_currency_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_currency_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_currency_id_seq OWNER TO test;

--
-- Name: reference_currency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_currency_id_seq OWNED BY reference_currency.id;


--
-- Name: reference_decree; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_decree (
    id integer NOT NULL,
    external_id character varying(100),
    name character varying(80) NOT NULL,
    start_date date,
    end_date date,
    uuid uuid NOT NULL
);


ALTER TABLE reference_decree OWNER TO test;

--
-- Name: reference_decree_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_decree_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_decree_id_seq OWNER TO test;

--
-- Name: reference_decree_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_decree_id_seq OWNED BY reference_decree.id;


--
-- Name: reference_domain; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_domain (
    id integer NOT NULL,
    external_id character varying(100),
    name character varying(255) NOT NULL,
    decree_id integer,
    parent_id integer,
    adhoc boolean NOT NULL,
    "national" boolean NOT NULL,
    reference character varying(10),
    type character varying(50) NOT NULL,
    uuid uuid NOT NULL
);


ALTER TABLE reference_domain OWNER TO test;

--
-- Name: reference_domain_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_domain_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_domain_id_seq OWNER TO test;

--
-- Name: reference_domain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_domain_id_seq OWNED BY reference_domain.id;


--
-- Name: reference_gradetype; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_gradetype (
    id integer NOT NULL,
    external_id character varying(100),
    name character varying(255) NOT NULL,
    coverage character varying(30) NOT NULL,
    adhoc boolean NOT NULL,
    institutional boolean NOT NULL,
    uuid uuid NOT NULL,
    institutional_grade_type character varying(25)
);


ALTER TABLE reference_gradetype OWNER TO test;

--
-- Name: reference_gradetype_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_gradetype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_gradetype_id_seq OWNER TO test;

--
-- Name: reference_gradetype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_gradetype_id_seq OWNED BY reference_gradetype.id;


--
-- Name: reference_language; Type: TABLE; Schema: public; Owner: test
--

CREATE TABLE reference_language (
    id integer NOT NULL,
    code character varying(4) NOT NULL,
    name character varying(80) NOT NULL,
    external_id character varying(100),
    uuid uuid NOT NULL,
    recognized boolean NOT NULL
);


ALTER TABLE reference_language OWNER TO test;

--
-- Name: reference_language_id_seq; Type: SEQUENCE; Schema: public; Owner: test
--

CREATE SEQUENCE reference_language_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reference_language_id_seq OWNER TO test;

--
-- Name: reference_language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: test
--

ALTER SEQUENCE reference_language_id_seq OWNED BY reference_language.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_academicassistant ALTER COLUMN id SET DEFAULT nextval('assistant_academicassistant_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantdocumentfile ALTER COLUMN id SET DEFAULT nextval('assistant_assistantdocumentfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantmandate ALTER COLUMN id SET DEFAULT nextval('assistant_assistantmandate_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_manager ALTER COLUMN id SET DEFAULT nextval('assistant_manager_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_mandatestructure ALTER COLUMN id SET DEFAULT nextval('assistant_mandatestructures_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_message ALTER COLUMN id SET DEFAULT nextval('assistant_message_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_review ALTER COLUMN id SET DEFAULT nextval('assistant_review_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_reviewer ALTER COLUMN id SET DEFAULT nextval('assistant_reviewer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_settings ALTER COLUMN id SET DEFAULT nextval('assistant_settings_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_tutoringlearningunityear ALTER COLUMN id SET DEFAULT nextval('assistant_tutoringlearningunityear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attribution ALTER COLUMN id SET DEFAULT nextval('attribution_attribution_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attributioncharge ALTER COLUMN id SET DEFAULT nextval('attribution_attributioncharge_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academiccalendar ALTER COLUMN id SET DEFAULT nextval('base_academiccalendar_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academicyear ALTER COLUMN id SET DEFAULT nextval('base_academicyear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_applicationnotice ALTER COLUMN id SET DEFAULT nextval('base_applicationnotice_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_attribution ALTER COLUMN id SET DEFAULT nextval('base_attribution_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_campus ALTER COLUMN id SET DEFAULT nextval('base_campus_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entity ALTER COLUMN id SET DEFAULT nextval('base_entity_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityaddress ALTER COLUMN id SET DEFAULT nextval('base_entityaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitylink ALTER COLUMN id SET DEFAULT nextval('base_entitylink_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitymanager ALTER COLUMN id SET DEFAULT nextval('base_entitymanager_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityversion ALTER COLUMN id SET DEFAULT nextval('base_entityversion_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollment ALTER COLUMN id SET DEFAULT nextval('base_examenrollment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollmenthistory ALTER COLUMN id SET DEFAULT nextval('base_examenrollmenthistory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer ALTER COLUMN id SET DEFAULT nextval('base_externaloffer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclass ALTER COLUMN id SET DEFAULT nextval('base_learningclass_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclassyear ALTER COLUMN id SET DEFAULT nextval('base_learningclassyear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponent ALTER COLUMN id SET DEFAULT nextval('base_learningcomponent_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponentyear ALTER COLUMN id SET DEFAULT nextval('base_learningcomponentyear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontainer ALTER COLUMN id SET DEFAULT nextval('base_learningcontainer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontaineryear ALTER COLUMN id SET DEFAULT nextval('base_learningcontaineryear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunit ALTER COLUMN id SET DEFAULT nextval('base_learningunit_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponent ALTER COLUMN id SET DEFAULT nextval('base_learningunitcomponent_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponentclass ALTER COLUMN id SET DEFAULT nextval('base_learningunitcomponentclass_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitenrollment ALTER COLUMN id SET DEFAULT nextval('base_learningunitenrollment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear ALTER COLUMN id SET DEFAULT nextval('base_learningunityear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offer ALTER COLUMN id SET DEFAULT nextval('base_offer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offerenrollment ALTER COLUMN id SET DEFAULT nextval('base_offerenrollment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offertype ALTER COLUMN id SET DEFAULT nextval('base_offertype_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear ALTER COLUMN id SET DEFAULT nextval('base_offeryear_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryearcalendar ALTER COLUMN id SET DEFAULT nextval('base_offeryearcalendar_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryeardomain ALTER COLUMN id SET DEFAULT nextval('base_offeryeardomain_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organization ALTER COLUMN id SET DEFAULT nextval('base_organization_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organizationaddress ALTER COLUMN id SET DEFAULT nextval('base_organizationaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_person ALTER COLUMN id SET DEFAULT nextval('base_person_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_personaddress ALTER COLUMN id SET DEFAULT nextval('base_personaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_programmanager ALTER COLUMN id SET DEFAULT nextval('base_programmemanager_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexam ALTER COLUMN id SET DEFAULT nextval('base_sessionexam_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamcalendar ALTER COLUMN id SET DEFAULT nextval('base_sessionexamcalendar_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamdeadline ALTER COLUMN id SET DEFAULT nextval('base_sessionexamdeadline_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structure ALTER COLUMN id SET DEFAULT nextval('base_structure_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structureaddress ALTER COLUMN id SET DEFAULT nextval('base_structureaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_student ALTER COLUMN id SET DEFAULT nextval('base_student_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_synchronization ALTER COLUMN id SET DEFAULT nextval('base_synchronization_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_tutor ALTER COLUMN id SET DEFAULT nextval('base_tutor_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_textlabel ALTER COLUMN id SET DEFAULT nextval('cms_textlabel_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtext ALTER COLUMN id SET DEFAULT nextval('cms_translatedtext_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtextlabel ALTER COLUMN id SET DEFAULT nextval('cms_translatedtextlabel_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_adviser ALTER COLUMN id SET DEFAULT nextval('dissertation_adviser_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationdocumentfile ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertationdocumentfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationgroup ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertationgroup_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationlocation ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertationlocation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationrole ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertationrole_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationupdate ALTER COLUMN id SET DEFAULT nextval('dissertation_dissertationupdate_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_facultyadviser ALTER COLUMN id SET DEFAULT nextval('dissertation_facultyadviser_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_offerproposition ALTER COLUMN id SET DEFAULT nextval('dissertation_offerproposition_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondissertation ALTER COLUMN id SET DEFAULT nextval('dissertation_propositiondissertation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondocumentfile ALTER COLUMN id SET DEFAULT nextval('dissertation_propositiondocumentfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionoffer ALTER COLUMN id SET DEFAULT nextval('dissertation_propositionoffer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionrole ALTER COLUMN id SET DEFAULT nextval('dissertation_propositionrole_id_seq'::regclass);


ALTER TABLE ONLY internship_affectationgenerationtime ALTER COLUMN id SET DEFAULT nextval('internship_affectationgenerationtime_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_cohort ALTER COLUMN id SET DEFAULT nextval('internship_cohort_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship ALTER COLUMN id SET DEFAULT nextval('internship_internship_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice ALTER COLUMN id SET DEFAULT nextval('internship_internshipchoice_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment ALTER COLUMN id SET DEFAULT nextval('internship_internshipenrollment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipmaster ALTER COLUMN id SET DEFAULT nextval('internship_internshipmaster_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer ALTER COLUMN id SET DEFAULT nextval('internship_internshipoffer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspeciality ALTER COLUMN id SET DEFAULT nextval('internship_internshipspeciality_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroup ALTER COLUMN id SET DEFAULT nextval('internship_internshipspecialitygroup_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroupmember ALTER COLUMN id SET DEFAULT nextval('internship_internshipspecialitygroupmember_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat ALTER COLUMN id SET DEFAULT nextval('internship_internshipstudentaffectationstat_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentinformation ALTER COLUMN id SET DEFAULT nextval('internship_internshipstudentinformation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organization ALTER COLUMN id SET DEFAULT nextval('internship_organization_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organizationaddress ALTER COLUMN id SET DEFAULT nextval('internship_organizationaddress_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_period ALTER COLUMN id SET DEFAULT nextval('internship_period_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_periodinternshipplaces ALTER COLUMN id SET DEFAULT nextval('internship_periodinternshipplaces_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_documentfile ALTER COLUMN id SET DEFAULT nextval('osis_common_documentfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_messagehistory ALTER COLUMN id SET DEFAULT nextval('osis_common_messagehistory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_messagetemplate ALTER COLUMN id SET DEFAULT nextval('osis_common_messagetemplate_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_queueexception ALTER COLUMN id SET DEFAULT nextval('osis_common_queueexception_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_continent ALTER COLUMN id SET DEFAULT nextval('reference_continent_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country ALTER COLUMN id SET DEFAULT nextval('reference_country_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_currency ALTER COLUMN id SET DEFAULT nextval('reference_currency_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_decree ALTER COLUMN id SET DEFAULT nextval('reference_decree_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_domain ALTER COLUMN id SET DEFAULT nextval('reference_domain_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_gradetype ALTER COLUMN id SET DEFAULT nextval('reference_gradetype_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_language ALTER COLUMN id SET DEFAULT nextval('reference_language_id_seq'::regclass);


--
-- Data for Name: assistant_academicassistant; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_academicassistant (id, thesis_title, phd_inscription_date, confirmation_test_date, thesis_date, expected_phd_date, remark, inscription, person_id, supervisor_id) FROM stdin;
\.


--
-- Name: assistant_academicassistant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_academicassistant_id_seq', 1, false);


--
-- Data for Name: assistant_assistantdocumentfile; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_assistantdocumentfile (id, assistant_mandate_id, document_file_id) FROM stdin;
\.


--
-- Name: assistant_assistantdocumentfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_assistantdocumentfile_id_seq', 1, false);


--
-- Data for Name: assistant_assistantmandate; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_assistantmandate (id, absences, comment, other_status, renewal_type, external_functions, external_contract, justification, state, tutoring_remark, activities_report_remark, research_percent, tutoring_percent, service_activities_percent, formation_activities_percent, internships, conferences, publications, awards, framing, remark, degrees, formations, faculty_representation, institute_representation, sector_representation, governing_body_representation, corsci_representation, students_service, infrastructure_mgmt_service, events_organisation_service, publishing_field_service, scientific_jury_service, appeal, special, contract_duration, contract_duration_fte, assistant_id, service_activities_remark, academic_year_id, assistant_type, end_date, entry_date, fulltime_equivalent, position_id, sap_id, scale) FROM stdin;
\.


--
-- Name: assistant_assistantmandate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_assistantmandate_id_seq', 1, false);


--
-- Data for Name: assistant_manager; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_manager (id, person_id) FROM stdin;
\.


--
-- Name: assistant_manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_manager_id_seq', 1, false);


--
-- Data for Name: assistant_mandatestructure; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_mandatestructure (id, assistant_mandate_id, structure_id) FROM stdin;
\.


--
-- Name: assistant_mandatestructures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_mandatestructures_id_seq', 1, false);


--
-- Data for Name: assistant_message; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_message (id, date, type, academic_year_id, sender_id) FROM stdin;
\.


--
-- Name: assistant_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_message_id_seq', 1, false);


--
-- Data for Name: assistant_review; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_review (id, advice, justification, remark, confidential, mandate_id, changed, status, reviewer_id) FROM stdin;
\.


--
-- Name: assistant_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_review_id_seq', 1, false);


--
-- Data for Name: assistant_reviewer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_reviewer (id, role, person_id, structure_id) FROM stdin;
\.


--
-- Name: assistant_reviewer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_reviewer_id_seq', 1, false);


--
-- Data for Name: assistant_settings; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_settings (id, starting_date, ending_date) FROM stdin;
\.


--
-- Name: assistant_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_settings_id_seq', 1, false);


--
-- Data for Name: assistant_tutoringlearningunityear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY assistant_tutoringlearningunityear (id, sessions_duration, sessions_number, series_number, face_to_face_duration, attendees, preparation_duration, exams_supervision_duration, mandate_id, others_delivery, learning_unit_year_id) FROM stdin;
\.


--
-- Name: assistant_tutoringlearningunityear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('assistant_tutoringlearningunityear_id_seq', 1, false);


--
-- Data for Name: attribution_attribution; Type: TABLE DATA; Schema: public; Owner: test
--

COPY attribution_attribution (id, external_id, changed, start_date, end_date, function, learning_unit_year_id, tutor_id, score_responsible, uuid, end_year, start_year) FROM stdin;
\.


--
-- Name: attribution_attribution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('attribution_attribution_id_seq', 1, false);


--
-- Data for Name: attribution_attributioncharge; Type: TABLE DATA; Schema: public; Owner: test
--

COPY attribution_attributioncharge (id, uuid, allocation_charge, attribution_id, learning_unit_component_id, external_id) FROM stdin;
\.


--
-- Name: attribution_attributioncharge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('attribution_attributioncharge_id_seq', 1, false);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_group (id, name) FROM stdin;
1	administrators
2	tutors
3	program_managers
4	students
5	institution_administration
6	internship_manager
7	internship_students
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_group_id_seq', 7, true);


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
1	1	81
2	2	89
3	2	90
4	2	164
5	2	165
6	2	326
7	3	164
8	3	165
9	3	326
10	3	55
11	3	89
12	3	90
13	3	59
14	4	164
15	5	185
16	5	82
17	5	175
19	6	291
20	6	164
21	6	292
22	7	164
23	7	292
\.


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 23, true);


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add permission	2	add_permission
5	Can change permission	2	change_permission
6	Can delete permission	2	delete_permission
7	Can add group	3	add_group
8	Can change group	3	change_group
9	Can delete group	3	delete_group
10	Can add user	4	add_user
11	Can change user	4	change_user
12	Can delete user	4	delete_user
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add message history	7	add_messagehistory
20	Can change message history	7	change_messagehistory
21	Can delete message history	7	delete_messagehistory
22	Can add message template	8	add_messagetemplate
23	Can change message template	8	change_messagetemplate
24	Can delete message template	8	delete_messagetemplate
25	Can add document file	9	add_documentfile
26	Can change document file	9	change_documentfile
27	Can delete document file	9	delete_documentfile
28	Can add queue exception	10	add_queueexception
29	Can change queue exception	10	change_queueexception
30	Can delete queue exception	10	delete_queueexception
31	Can add continent	11	add_continent
32	Can change continent	11	change_continent
33	Can delete continent	11	delete_continent
34	Can add country	12	add_country
35	Can change country	12	change_country
36	Can delete country	12	delete_country
37	Can add currency	13	add_currency
38	Can change currency	13	change_currency
39	Can delete currency	13	delete_currency
40	Can add decree	14	add_decree
41	Can change decree	14	change_decree
42	Can delete decree	14	delete_decree
43	Can add domain	15	add_domain
44	Can change domain	15	change_domain
45	Can delete domain	15	delete_domain
46	Can add grade type	16	add_gradetype
47	Can change grade type	16	change_gradetype
48	Can delete grade type	16	delete_gradetype
49	Can add language	17	add_language
50	Can change language	17	change_language
51	Can delete language	17	delete_language
52	Can add academic calendar	18	add_academiccalendar
53	Can change academic calendar	18	change_academiccalendar
54	Can delete academic calendar	18	delete_academiccalendar
55	Can access academic calendar	18	can_access_academic_calendar
56	Can add academic year	19	add_academicyear
57	Can change academic year	19	change_academicyear
58	Can delete academic year	19	delete_academicyear
59	Can access academic year	19	can_access_academicyear
60	Can add application notice	20	add_applicationnotice
61	Can change application notice	20	change_applicationnotice
62	Can delete application notice	20	delete_applicationnotice
63	Can add campus	21	add_campus
64	Can change campus	21	change_campus
65	Can delete campus	21	delete_campus
66	Can add entity link	22	add_entitylink
67	Can change entity link	22	change_entitylink
68	Can delete entity link	22	delete_entitylink
69	Can add entity	23	add_entity
70	Can change entity	23	change_entity
71	Can delete entity	23	delete_entity
72	Can add entity address	24	add_entityaddress
73	Can change entity address	24	change_entityaddress
74	Can delete entity address	24	delete_entityaddress
75	Can add entity version	25	add_entityversion
76	Can change entity version	25	change_entityversion
77	Can delete entity version	25	delete_entityversion
78	Can add person	26	add_person
79	Can change person	26	change_person
80	Can delete person	26	delete_person
81	Is administrator	26	is_administrator
82	Is institution administrator 	26	is_institution_administrator
83	Can add person address	27	add_personaddress
84	Can change person address	27	change_personaddress
85	Can delete person address	27	delete_personaddress
86	Can add offer	28	add_offer
87	Can change offer	28	change_offer
88	Can delete offer	28	delete_offer
89	Can access offer	28	can_access_offer
90	Can access catalog	28	can_access_catalog
91	Can add learning unit enrollment	29	add_learningunitenrollment
92	Can change learning unit enrollment	29	change_learningunitenrollment
93	Can delete learning unit enrollment	29	delete_learningunitenrollment
94	Can add program manager	30	add_programmanager
95	Can change program manager	30	change_programmanager
96	Can delete program manager	30	delete_programmanager
97	Can add offer year	31	add_offeryear
98	Can change offer year	31	change_offeryear
99	Can delete offer year	31	delete_offeryear
100	Can add offer year calendar	32	add_offeryearcalendar
101	Can change offer year calendar	32	change_offeryearcalendar
102	Can delete offer year calendar	32	delete_offeryearcalendar
103	Can add session exam calendar	33	add_sessionexamcalendar
104	Can change session exam calendar	33	change_sessionexamcalendar
105	Can delete session exam calendar	33	delete_sessionexamcalendar
106	Can add session exam deadline	34	add_sessionexamdeadline
107	Can change session exam deadline	34	change_sessionexamdeadline
108	Can delete session exam deadline	34	delete_sessionexamdeadline
109	Can add tutor	35	add_tutor
110	Can change tutor	35	change_tutor
111	Can delete tutor	35	delete_tutor
112	Can add exam enrollment	36	add_examenrollment
113	Can change exam enrollment	36	change_examenrollment
114	Can delete exam enrollment	36	delete_examenrollment
115	Can add exam enrollment history	37	add_examenrollmenthistory
116	Can change exam enrollment history	37	change_examenrollmenthistory
117	Can delete exam enrollment history	37	delete_examenrollmenthistory
118	Can add external offer	38	add_externaloffer
119	Can change external offer	38	change_externaloffer
120	Can delete external offer	38	delete_externaloffer
121	Can add entity manager	39	add_entitymanager
122	Can change entity manager	39	change_entitymanager
123	Can delete entity manager	39	delete_entitymanager
124	Is entity manager 	39	is_entity_manager
125	Can add learning class	40	add_learningclass
126	Can change learning class	40	change_learningclass
127	Can delete learning class	40	delete_learningclass
128	Can add learning class year	41	add_learningclassyear
129	Can change learning class year	41	change_learningclassyear
130	Can delete learning class year	41	delete_learningclassyear
131	Can access learning class year	41	can_access_learningclassyear
132	Can add learning component	42	add_learningcomponent
133	Can change learning component	42	change_learningcomponent
134	Can delete learning component	42	delete_learningcomponent
135	Can add learning component year	43	add_learningcomponentyear
136	Can change learning component year	43	change_learningcomponentyear
137	Can delete learning component year	43	delete_learningcomponentyear
138	Can access learning unit component year	43	can_access_learningunitcomponentyear
139	Can add learning container	44	add_learningcontainer
140	Can change learning container	44	change_learningcontainer
141	Can delete learning container	44	delete_learningcontainer
142	Can add learning container year	45	add_learningcontaineryear
143	Can change learning container year	45	change_learningcontaineryear
144	Can delete learning container year	45	delete_learningcontaineryear
145	Can access learning container year	45	can_access_learningcontaineryear
146	Can add learning unit	46	add_learningunit
147	Can change learning unit	46	change_learningunit
148	Can delete learning unit	46	delete_learningunit
149	Can access learning unit	46	can_access_learningunit
150	Can add learning unit component	47	add_learningunitcomponent
151	Can change learning unit component	47	change_learningunitcomponent
152	Can delete learning unit component	47	delete_learningunitcomponent
153	Can access learning unit	47	can_access_learningunit
154	Can add learning unit component class	48	add_learningunitcomponentclass
155	Can change learning unit component class	48	change_learningunitcomponentclass
156	Can delete learning unit component class	48	delete_learningunitcomponentclass
157	Can access learning unit component class	48	can_access_learningunitcomponentclass
158	Can add learning unit year	49	add_learningunityear
159	Can change learning unit year	49	change_learningunityear
160	Can delete learning unit year	49	delete_learningunityear
161	Can add offer enrollment	50	add_offerenrollment
162	Can change offer enrollment	50	change_offerenrollment
163	Can delete offer enrollment	50	delete_offerenrollment
164	Can access student path	50	can_access_student_path
165	Can access evaluation	50	can_access_evaluation
166	Can add offer type	51	add_offertype
167	Can change offer type	51	change_offertype
168	Can delete offer type	51	delete_offertype
169	Can add offer year domain	52	add_offeryeardomain
170	Can change offer year domain	52	change_offeryeardomain
171	Can delete offer year domain	52	delete_offeryeardomain
172	Can add organization	53	add_organization
173	Can change organization	53	change_organization
174	Can delete organization	53	delete_organization
175	Can access organization	53	can_access_organization
176	Can add organization address	54	add_organizationaddress
177	Can change organization address	54	change_organizationaddress
178	Can delete organization address	54	delete_organizationaddress
179	Can add session exam	55	add_sessionexam
180	Can change session exam	55	change_sessionexam
181	Can delete session exam	55	delete_sessionexam
182	Can add structure	56	add_structure
183	Can change structure	56	change_structure
184	Can delete structure	56	delete_structure
185	Can access structure	56	can_access_structure
186	Can add structure address	57	add_structureaddress
187	Can change structure address	57	change_structureaddress
188	Can delete structure address	57	delete_structureaddress
189	Can add student	58	add_student
190	Can change student	58	change_student
191	Can delete student	58	delete_student
192	Can add synchronization	59	add_synchronization
193	Can change synchronization	59	change_synchronization
194	Can delete synchronization	59	delete_synchronization
195	Can add attribution	60	add_attribution
196	Can change attribution	60	change_attribution
197	Can delete attribution	60	delete_attribution
198	Can add attribution	61	add_attribution
199	Can change attribution	61	change_attribution
200	Can delete attribution	61	delete_attribution
201	Can add attribution charge	62	add_attributioncharge
202	Can change attribution charge	62	change_attributioncharge
203	Can delete attribution charge	62	delete_attributioncharge
204	Can add academic assistant	63	add_academicassistant
205	Can change academic assistant	63	change_academicassistant
206	Can delete academic assistant	63	delete_academicassistant
207	Can add assistant document file	64	add_assistantdocumentfile
208	Can change assistant document file	64	change_assistantdocumentfile
209	Can delete assistant document file	64	delete_assistantdocumentfile
210	Can add assistant mandate	65	add_assistantmandate
211	Can change assistant mandate	65	change_assistantmandate
212	Can delete assistant mandate	65	delete_assistantmandate
213	Can add manager	66	add_manager
214	Can change manager	66	change_manager
215	Can delete manager	66	delete_manager
216	Can add mandate structure	67	add_mandatestructure
217	Can change mandate structure	67	change_mandatestructure
218	Can delete mandate structure	67	delete_mandatestructure
219	Can add message	68	add_message
220	Can change message	68	change_message
221	Can delete message	68	delete_message
222	Can add review	69	add_review
223	Can change review	69	change_review
224	Can delete review	69	delete_review
225	Can add reviewer	70	add_reviewer
226	Can change reviewer	70	change_reviewer
227	Can delete reviewer	70	delete_reviewer
228	Can add settings	71	add_settings
229	Can change settings	71	change_settings
230	Can delete settings	71	delete_settings
231	Can add tutoring learning unit year	72	add_tutoringlearningunityear
232	Can change tutoring learning unit year	72	change_tutoringlearningunityear
233	Can delete tutoring learning unit year	72	delete_tutoringlearningunityear
234	Can add dissertation role	73	add_dissertationrole
235	Can change dissertation role	73	change_dissertationrole
236	Can delete dissertation role	73	delete_dissertationrole
237	Can add adviser	74	add_adviser
238	Can change adviser	74	change_adviser
239	Can delete adviser	74	delete_adviser
240	Can add proposition offer	75	add_propositionoffer
241	Can change proposition offer	75	change_propositionoffer
242	Can delete proposition offer	75	delete_propositionoffer
243	Can add proposition dissertation	76	add_propositiondissertation
244	Can change proposition dissertation	76	change_propositiondissertation
245	Can delete proposition dissertation	76	delete_propositiondissertation
246	Can add offer proposition	77	add_offerproposition
247	Can change offer proposition	77	change_offerproposition
248	Can delete offer proposition	77	delete_offerproposition
249	Can add dissertation location	78	add_dissertationlocation
250	Can change dissertation location	78	change_dissertationlocation
251	Can delete dissertation location	78	delete_dissertationlocation
252	Can add dissertation	79	add_dissertation
253	Can change dissertation	79	change_dissertation
254	Can delete dissertation	79	delete_dissertation
255	Can add dissertation document file	80	add_dissertationdocumentfile
256	Can change dissertation document file	80	change_dissertationdocumentfile
257	Can delete dissertation document file	80	delete_dissertationdocumentfile
258	Can add dissertation group	81	add_dissertationgroup
259	Can change dissertation group	81	change_dissertationgroup
260	Can delete dissertation group	81	delete_dissertationgroup
261	Can add dissertation update	82	add_dissertationupdate
262	Can change dissertation update	82	change_dissertationupdate
263	Can delete dissertation update	82	delete_dissertationupdate
264	Can add faculty adviser	83	add_facultyadviser
265	Can change faculty adviser	83	change_facultyadviser
266	Can delete faculty adviser	83	delete_facultyadviser
267	Can add proposition document file	84	add_propositiondocumentfile
268	Can change proposition document file	84	change_propositiondocumentfile
269	Can delete proposition document file	84	delete_propositiondocumentfile
270	Can add proposition role	85	add_propositionrole
271	Can change proposition role	85	change_propositionrole
272	Can delete proposition role	85	delete_propositionrole
273	Can add affectation generation time	86	add_affectationgenerationtime
274	Can change affectation generation time	86	change_affectationgenerationtime
275	Can delete affectation generation time	86	delete_affectationgenerationtime
276	Can add internship	87	add_internship
277	Can change internship	87	change_internship
278	Can delete internship	87	delete_internship
279	Can add internship choice	88	add_internshipchoice
280	Can change internship choice	88	change_internshipchoice
281	Can delete internship choice	88	delete_internshipchoice
282	Can add internship enrollment	89	add_internshipenrollment
283	Can change internship enrollment	89	change_internshipenrollment
284	Can delete internship enrollment	89	delete_internshipenrollment
285	Can add internship master	90	add_internshipmaster
286	Can change internship master	90	change_internshipmaster
287	Can delete internship master	90	delete_internshipmaster
288	Can add internship offer	91	add_internshipoffer
289	Can change internship offer	91	change_internshipoffer
290	Can delete internship offer	91	delete_internshipoffer
291	Is Internship Manager	91	is_internship_manager
292	Can access internships	91	can_access_internship
293	Can add internship speciality	92	add_internshipspeciality
294	Can change internship speciality	92	change_internshipspeciality
295	Can delete internship speciality	92	delete_internshipspeciality
296	Can add internship speciality group	93	add_internshipspecialitygroup
297	Can change internship speciality group	93	change_internshipspecialitygroup
298	Can delete internship speciality group	93	delete_internshipspecialitygroup
299	Can add internship speciality group member	94	add_internshipspecialitygroupmember
300	Can change internship speciality group member	94	change_internshipspecialitygroupmember
301	Can delete internship speciality group member	94	delete_internshipspecialitygroupmember
302	Can add internship student affectation stat	95	add_internshipstudentaffectationstat
303	Can change internship student affectation stat	95	change_internshipstudentaffectationstat
304	Can delete internship student affectation stat	95	delete_internshipstudentaffectationstat
305	Can add internship student information	96	add_internshipstudentinformation
306	Can change internship student information	96	change_internshipstudentinformation
307	Can delete internship student information	96	delete_internshipstudentinformation
308	Can add organization	97	add_organization
309	Can change organization	97	change_organization
310	Can delete organization	97	delete_organization
311	Can add organization address	98	add_organizationaddress
312	Can change organization address	98	change_organizationaddress
313	Can delete organization address	98	delete_organizationaddress
314	Can add period	99	add_period
315	Can change period	99	change_period
316	Can delete period	99	delete_period
317	Can add period internship places	100	add_periodinternshipplaces
318	Can change period internship places	100	change_periodinternshipplaces
319	Can delete period internship places	100	delete_periodinternshipplaces
320	Can add cohort	101	add_cohort
321	Can change cohort	101	change_cohort
322	Can delete cohort	101	delete_cohort
323	Can add scores encoding	102	add_scoresencoding
324	Can change scores encoding	102	change_scoresencoding
325	Can delete scores encoding	102	delete_scoresencoding
326	Can access scoreencoding	102	can_access_scoreencoding
327	Can add text label	103	add_textlabel
328	Can change text label	103	change_textlabel
329	Can delete text label	103	delete_textlabel
330	Can add translated text	104	add_translatedtext
331	Can change translated text	104	change_translatedtext
332	Can delete translated text	104	delete_translatedtext
333	Can add translated text label	105	add_translatedtextlabel
334	Can change translated text label	105	change_translatedtextlabel
335	Can delete translated text label	105	delete_translatedtextlabel
\.


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_permission_id_seq', 335, true);


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_user_id_seq', 1, false);


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: test
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);


--
-- Data for Name: base_academiccalendar; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_academiccalendar (id, external_id, title, description, start_date, end_date, academic_year_id, changed, highlight_description, highlight_shortcut, highlight_title, uuid, reference) FROM stdin;
\.


--
-- Name: base_academiccalendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_academiccalendar_id_seq', 1, false);


--
-- Data for Name: base_academicyear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_academicyear (id, external_id, year, changed, end_date, start_date, uuid) FROM stdin;
\.


--
-- Name: base_academicyear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_academicyear_id_seq', 1, false);


--
-- Data for Name: base_applicationnotice; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_applicationnotice (id, subject, notice, start_publish, stop_publish) FROM stdin;
\.


--
-- Name: base_applicationnotice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_applicationnotice_id_seq', 1, false);


--
-- Data for Name: base_attribution; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_attribution (id, external_id, start_date, end_date, function, tutor_id, changed, learning_unit_year_id) FROM stdin;
\.


--
-- Name: base_attribution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_attribution_id_seq', 1, false);


--
-- Data for Name: base_campus; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_campus (id, external_id, changed, name, organization_id, uuid) FROM stdin;
\.


--
-- Name: base_campus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_campus_id_seq', 1, false);


--
-- Data for Name: base_entity; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_entity (id, organization_id) FROM stdin;
\.


--
-- Name: base_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_entity_id_seq', 1, false);


--
-- Data for Name: base_entityaddress; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_entityaddress (id, label, location, postal_code, city, country, entity_id) FROM stdin;
\.


--
-- Name: base_entityaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_entityaddress_id_seq', 1, false);


--
-- Data for Name: base_entitylink; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_entitylink (id, start_date, end_date, child_id, parent_id) FROM stdin;
\.


--
-- Name: base_entitylink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_entitylink_id_seq', 1, false);


--
-- Data for Name: base_entitymanager; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_entitymanager (id, uuid, person_id, structure_id) FROM stdin;
\.


--
-- Name: base_entitymanager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_entitymanager_id_seq', 1, false);


--
-- Data for Name: base_entityversion; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_entityversion (id, title, acronym, entity_type, start_date, end_date, entity_id) FROM stdin;
\.


--
-- Name: base_entityversion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_entityversion_id_seq', 1, false);


--
-- Data for Name: base_examenrollment; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_examenrollment (id, external_id, score_draft, score_reencoded, score_final, justification_draft, justification_reencoded, justification_final, learning_unit_enrollment_id, session_exam_id, changed, enrollment_state) FROM stdin;
\.


--
-- Name: base_examenrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_examenrollment_id_seq', 1, false);


--
-- Data for Name: base_examenrollmenthistory; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_examenrollmenthistory (id, score_final, justification_final, modification_date, exam_enrollment_id, person_id) FROM stdin;
\.


--
-- Name: base_examenrollmenthistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_examenrollmenthistory_id_seq', 1, false);


--
-- Data for Name: base_externaloffer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_externaloffer (id, uuid, external_id, changed, name, adhoc, "national", domain_id, grade_type_id, offer_year_id) FROM stdin;
\.


--
-- Name: base_externaloffer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_externaloffer_id_seq', 1, false);


--
-- Data for Name: base_learningclass; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningclass (id, learning_component_id) FROM stdin;
\.


--
-- Name: base_learningclass_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningclass_id_seq', 1, false);


--
-- Data for Name: base_learningclassyear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningclassyear (id, acronym, learning_class_id, learning_component_year_id) FROM stdin;
\.


--
-- Name: base_learningclassyear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningclassyear_id_seq', 1, false);


--
-- Data for Name: base_learningcomponent; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningcomponent (id, learning_container_id) FROM stdin;
\.


--
-- Name: base_learningcomponent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningcomponent_id_seq', 1, false);


--
-- Data for Name: base_learningcomponentyear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningcomponentyear (id, title, acronym, type, comment, learning_component_id, learning_container_year_id) FROM stdin;
\.


--
-- Name: base_learningcomponentyear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningcomponentyear_id_seq', 1, false);


--
-- Data for Name: base_learningcontainer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningcontainer (id, title) FROM stdin;
\.


--
-- Name: base_learningcontainer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningcontainer_id_seq', 1, false);


--
-- Data for Name: base_learningcontaineryear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningcontaineryear (id, title, acronym, academic_year_id, learning_container_id) FROM stdin;
\.


--
-- Name: base_learningcontaineryear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningcontaineryear_id_seq', 1, false);


--
-- Data for Name: base_learningunit; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningunit (id, external_id, acronym, title, description, start_year, end_year, changed, uuid, periodicity, learning_container_id) FROM stdin;
\.


--
-- Name: base_learningunit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningunit_id_seq', 1, false);


--
-- Data for Name: base_learningunitcomponent; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningunitcomponent (id, external_id, type, duration, learning_unit_year_id, uuid, learning_component_year_id, coefficient_repetition) FROM stdin;
\.


--
-- Name: base_learningunitcomponent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningunitcomponent_id_seq', 1, false);


--
-- Data for Name: base_learningunitcomponentclass; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningunitcomponentclass (id, learning_unit_component_id, learning_unit_year_id) FROM stdin;
\.


--
-- Name: base_learningunitcomponentclass_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningunitcomponentclass_id_seq', 1, false);


--
-- Data for Name: base_learningunitenrollment; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningunitenrollment (id, external_id, date_enrollment, learning_unit_year_id, offer_enrollment_id, changed, uuid) FROM stdin;
\.


--
-- Name: base_learningunitenrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningunitenrollment_id_seq', 1, false);


--
-- Data for Name: base_learningunityear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_learningunityear (id, external_id, acronym, title, credits, decimal_scores, academic_year_id, learning_unit_id, changed, team, uuid, in_charge, vacant, type, learning_container_year_id, status, structure_id) FROM stdin;
\.


--
-- Name: base_learningunityear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_learningunityear_id_seq', 1, false);


--
-- Data for Name: base_offer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offer (id, external_id, title, changed, uuid) FROM stdin;
\.


--
-- Name: base_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offer_id_seq', 1, false);


--
-- Data for Name: base_offerenrollment; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offerenrollment (id, external_id, date_enrollment, offer_year_id, student_id, changed, uuid) FROM stdin;
\.


--
-- Name: base_offerenrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offerenrollment_id_seq', 1, false);


--
-- Data for Name: base_offertype; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offertype (id, external_id, name) FROM stdin;
\.


--
-- Name: base_offertype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offertype_id_seq', 1, false);


--
-- Data for Name: base_offeryear; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offeryear (id, external_id, acronym, title, academic_year_id, offer_id, changed, parent_id, grade, title_international, title_printable, title_short, city, country_id, entity_administration_id, entity_administration_fac_id, entity_management_id, entity_management_fac_id, fax, location, phone, postal_code, recipient, campus_id, grade_type_id, uuid, enrollment_enabled, email, offer_type_id) FROM stdin;
\.


--
-- Name: base_offeryear_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offeryear_id_seq', 1, false);


--
-- Data for Name: base_offeryearcalendar; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offeryearcalendar (id, external_id, start_date, end_date, academic_calendar_id, offer_year_id, changed, customized) FROM stdin;
\.


--
-- Name: base_offeryearcalendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offeryearcalendar_id_seq', 1, false);


--
-- Data for Name: base_offeryeardomain; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_offeryeardomain (id, external_id, changed, domain_id, offer_year_id, uuid) FROM stdin;
\.


--
-- Name: base_offeryeardomain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_offeryeardomain_id_seq', 1, false);


--
-- Data for Name: base_organization; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_organization (id, external_id, name, acronym, changed, reference, website, type, uuid) FROM stdin;
\.


--
-- Name: base_organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_organization_id_seq', 1, false);


--
-- Data for Name: base_organizationaddress; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_organizationaddress (id, label, location, postal_code, city, country_id, organization_id) FROM stdin;
\.


--
-- Name: base_organizationaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_organizationaddress_id_seq', 1, false);


--
-- Data for Name: base_person; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_person (id, external_id, global_id, gender, national_id, first_name, middle_name, last_name, user_id, email, changed, phone, phone_mobile, language, uuid, source, birth_date, employee) FROM stdin;
\.


--
-- Name: base_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_person_id_seq', 1, false);


--
-- Data for Name: base_personaddress; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_personaddress (id, label, location, postal_code, city, country_id, person_id, external_id) FROM stdin;
\.


--
-- Name: base_personaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_personaddress_id_seq', 1, false);


--
-- Data for Name: base_programmanager; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_programmanager (id, person_id, changed, offer_year_id, external_id) FROM stdin;
\.


--
-- Name: base_programmemanager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_programmemanager_id_seq', 1, false);


--
-- Data for Name: base_sessionexam; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_sessionexam (id, external_id, number_session, learning_unit_year_id, changed, offer_year_id) FROM stdin;
\.


--
-- Name: base_sessionexam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_sessionexam_id_seq', 1, false);


--
-- Data for Name: base_sessionexamcalendar; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_sessionexamcalendar (id, external_id, changed, number_session, academic_calendar_id) FROM stdin;
\.


--
-- Name: base_sessionexamcalendar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_sessionexamcalendar_id_seq', 1, false);


--
-- Data for Name: base_sessionexamdeadline; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_sessionexamdeadline (id, external_id, changed, deadline, deadline_tutor, number_session, offer_enrollment_id) FROM stdin;
\.


--
-- Name: base_sessionexamdeadline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_sessionexamdeadline_id_seq', 1, false);


--
-- Data for Name: base_structure; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_structure (id, external_id, acronym, title, part_of_id, organization_id, changed, type) FROM stdin;
\.


--
-- Name: base_structure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_structure_id_seq', 1, false);


--
-- Data for Name: base_structureaddress; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_structureaddress (id, external_id, label, location, postal_code, city, phone, fax, email, country_id, structure_id) FROM stdin;
\.


--
-- Name: base_structureaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_structureaddress_id_seq', 1, false);


--
-- Data for Name: base_student; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_student (id, external_id, registration_id, person_id, changed, uuid) FROM stdin;
\.


--
-- Name: base_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_student_id_seq', 1, false);


--
-- Data for Name: base_synchronization; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_synchronization (id, date) FROM stdin;
\.


--
-- Name: base_synchronization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_synchronization_id_seq', 1, false);


--
-- Data for Name: base_tutor; Type: TABLE DATA; Schema: public; Owner: test
--

COPY base_tutor (id, external_id, person_id, changed, uuid) FROM stdin;
\.


--
-- Name: base_tutor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('base_tutor_id_seq', 1, false);


--
-- Data for Name: cms_textlabel; Type: TABLE DATA; Schema: public; Owner: test
--

COPY cms_textlabel (id, entity, label, "order", published, parent_id) FROM stdin;
\.


--
-- Name: cms_textlabel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('cms_textlabel_id_seq', 1, false);


--
-- Data for Name: cms_translatedtext; Type: TABLE DATA; Schema: public; Owner: test
--

COPY cms_translatedtext (id, entity, reference, text, language_id, text_label_id) FROM stdin;
\.


--
-- Name: cms_translatedtext_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('cms_translatedtext_id_seq', 1, false);


--
-- Data for Name: cms_translatedtextlabel; Type: TABLE DATA; Schema: public; Owner: test
--

COPY cms_translatedtextlabel (id, label, language_id, text_label_id) FROM stdin;
\.


--
-- Name: cms_translatedtextlabel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('cms_translatedtextlabel_id_seq', 1, false);


--
-- Data for Name: dissertation_adviser; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_adviser (id, type, available_by_email, available_by_phone, available_at_office, comment, person_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_adviser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_adviser_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertation; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertation (id, title, status, description, active, creation_date, modification_date, author_id, offer_year_start_id, proposition_dissertation_id, defend_periode, defend_year, location_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertation_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertationdocumentfile; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertationdocumentfile (id, dissertation_id, document_file_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertationdocumentfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertationdocumentfile_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertationgroup; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertationgroup (id, dissertation_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertationgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertationgroup_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertationlocation; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertationlocation (id, name, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertationlocation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertationlocation_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertationrole; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertationrole (id, status, adviser_id, dissertation_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertationrole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertationrole_id_seq', 1, false);


--
-- Data for Name: dissertation_dissertationupdate; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_dissertationupdate (id, status_from, status_to, created, justification, dissertation_id, person_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_dissertationupdate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_dissertationupdate_id_seq', 1, false);


--
-- Data for Name: dissertation_facultyadviser; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_facultyadviser (id, adviser_id, offer_id) FROM stdin;
\.


--
-- Name: dissertation_facultyadviser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_facultyadviser_id_seq', 1, false);


--
-- Data for Name: dissertation_offerproposition; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_offerproposition (id, acronym, student_can_manage_readers, adviser_can_suggest_reader, evaluation_first_year, validation_commission_exists, offer_id, end_visibility_dissertation, end_visibility_proposition, start_visibility_dissertation, start_visibility_proposition, end_edit_title, end_jury_visibility, start_edit_title, start_jury_visibility, uuid) FROM stdin;
\.


--
-- Name: dissertation_offerproposition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_offerproposition_id_seq', 1, false);


--
-- Data for Name: dissertation_propositiondissertation; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_propositiondissertation (id, collaboration, description, level, max_number_student, title, type, visibility, active, created_date, author_id, creator_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_propositiondissertation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_propositiondissertation_id_seq', 1, false);


--
-- Data for Name: dissertation_propositiondocumentfile; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_propositiondocumentfile (id, document_file_id, proposition_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_propositiondocumentfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_propositiondocumentfile_id_seq', 1, false);


--
-- Data for Name: dissertation_propositionoffer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_propositionoffer (id, offer_proposition_id, proposition_dissertation_id, uuid) FROM stdin;
\.


--
-- Name: dissertation_propositionoffer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_propositionoffer_id_seq', 1, false);


--
-- Data for Name: dissertation_propositionrole; Type: TABLE DATA; Schema: public; Owner: test
--

COPY dissertation_propositionrole (id, adviser_id, proposition_dissertation_id, status, uuid) FROM stdin;
\.


--
-- Name: dissertation_propositionrole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('dissertation_propositionrole_id_seq', 1, false);



--
-- Data for Name: internship_affectationgenerationtime; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_affectationgenerationtime (id, start_date_time, end_date_time, generated_by, cohort_id) FROM stdin;
\.


--
-- Name: internship_affectationgenerationtime_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_affectationgenerationtime_id_seq', 1, false);


--
-- Data for Name: internship_cohort; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_cohort (id, uuid, name, description, free_internships_number, publication_start_date, subscription_start_date, subscription_end_date) FROM stdin;
1	1091eebf-e3ed-4cfd-b13e-6b9e947f14bb	M7-2018	M7-2018	8	2017-03-27	2017-03-01	2017-03-20
\.


--
-- Name: internship_cohort_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_cohort_id_seq', 1, true);


--
-- Data for Name: internship_internship; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internship (id, uuid, name, length_in_periods, cohort_id, speciality_id, alternate_speciality_id) FROM stdin;
\.


--
-- Name: internship_internship_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internship_id_seq', 10, true);


--
-- Data for Name: internship_internshipchoice; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipchoice (id, choice, organization_id, student_id, priority, speciality_id, internship_id, uuid) FROM stdin;
\.


--
-- Name: internship_internshipchoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipchoice_id_seq', 1, false);


--
-- Data for Name: internship_internshipenrollment; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipenrollment (id, internship_offer_id, period_id, place_id, student_id, internship_id) FROM stdin;
\.


--
-- Name: internship_internshipenrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipenrollment_id_seq', 1, false);


--
-- Data for Name: internship_internshipmaster; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipmaster (id, reference, civility, type_mastery, speciality, organization_id, first_name, last_name, uuid) FROM stdin;
\.


--
-- Name: internship_internshipmaster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipmaster_id_seq', 1, false);


--
-- Data for Name: internship_internshipoffer; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipoffer (id, title, maximum_enrollments, organization_id, selectable, speciality_id, master, uuid, internship_id, cohort_id) FROM stdin;
\.


--
-- Name: internship_internshipoffer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipoffer_id_seq', 1, false);


--
-- Data for Name: internship_internshipspeciality; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipspeciality (id, name, learning_unit_id, mandatory, acronym, order_position, uuid, cohort_id) FROM stdin;
\.


--
-- Name: internship_internshipspeciality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipspeciality_id_seq', 1, false);


--
-- Data for Name: internship_internshipspecialitygroup; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipspecialitygroup (id, name) FROM stdin;
\.


--
-- Name: internship_internshipspecialitygroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipspecialitygroup_id_seq', 1, false);


--
-- Data for Name: internship_internshipspecialitygroupmember; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipspecialitygroupmember (id, group_id, speciality_id) FROM stdin;
\.


--
-- Name: internship_internshipspecialitygroupmember_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipspecialitygroupmember_id_seq', 1, false);


--
-- Data for Name: internship_internshipstudentaffectationstat; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipstudentaffectationstat (id, choice, cost, consecutive_month, organization_id, period_id, speciality_id, student_id, type_of_internship, uuid) FROM stdin;
\.


--
-- Name: internship_internshipstudentaffectationstat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipstudentaffectationstat_id_seq', 1, false);


--
-- Data for Name: internship_internshipstudentinformation; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_internshipstudentinformation (id, location, postal_code, city, country, email, phone_mobile, person_id, latitude, longitude, uuid, contest, cohort_id) FROM stdin;
\.


--
-- Name: internship_internshipstudentinformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_internshipstudentinformation_id_seq', 1, false);


--
-- Data for Name: internship_organization; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_organization (id, name, acronym, website, reference, type, uuid, cohort_id) FROM stdin;
\.


--
-- Name: internship_organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_organization_id_seq', 1, false);


--
-- Data for Name: internship_organizationaddress; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_organizationaddress (id, label, location, postal_code, city, country, organization_id, latitude, longitude, uuid) FROM stdin;
\.


--
-- Name: internship_organizationaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_organizationaddress_id_seq', 1, false);


--
-- Data for Name: internship_period; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_period (id, name, date_start, date_end, uuid, cohort_id) FROM stdin;
\.


--
-- Name: internship_period_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_period_id_seq', 1, false);


--
-- Data for Name: internship_periodinternshipplaces; Type: TABLE DATA; Schema: public; Owner: test
--

COPY internship_periodinternshipplaces (id, number_places, internship_offer_id, period_id, uuid) FROM stdin;
\.


--
-- Name: internship_periodinternshipplaces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('internship_periodinternshipplaces_id_seq', 1, false);


--
-- Data for Name: osis_common_documentfile; Type: TABLE DATA; Schema: public; Owner: test
--

COPY osis_common_documentfile (id, file_name, content_type, creation_date, storage_duration, file, description, application_name, size, uuid, update_by) FROM stdin;
\.


--
-- Name: osis_common_documentfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('osis_common_documentfile_id_seq', 1, false);


--
-- Data for Name: osis_common_messagehistory; Type: TABLE DATA; Schema: public; Owner: test
--

COPY osis_common_messagehistory (id, subject, content_txt, content_html, receiver_id, created, sent, reference, show_to_user, read_by_user) FROM stdin;
\.


--
-- Name: osis_common_messagehistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('osis_common_messagehistory_id_seq', 1, false);


--
-- Data for Name: osis_common_messagetemplate; Type: TABLE DATA; Schema: public; Owner: test
--

COPY osis_common_messagetemplate (id, reference, subject, template, format, language) FROM stdin;
\.


--
-- Name: osis_common_messagetemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('osis_common_messagetemplate_id_seq', 1, false);


--
-- Data for Name: osis_common_queueexception; Type: TABLE DATA; Schema: public; Owner: test
--

COPY osis_common_queueexception (id, queue_name, creation_date, message, exception_title, exception) FROM stdin;
\.


--
-- Name: osis_common_queueexception_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('osis_common_queueexception_id_seq', 1, false);


--
-- Data for Name: reference_continent; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_continent (id, code, name) FROM stdin;
\.


--
-- Name: reference_continent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_continent_id_seq', 1, false);


--
-- Data for Name: reference_country; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_country (id, iso_code, name, nationality, european_union, dialing_code, cref_code, continent_id, currency_id, external_id, uuid) FROM stdin;
\.


--
-- Name: reference_country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_country_id_seq', 1, false);


--
-- Data for Name: reference_currency; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_currency (id, name, code, symbol) FROM stdin;
\.


--
-- Name: reference_currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_currency_id_seq', 1, false);


--
-- Data for Name: reference_decree; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_decree (id, external_id, name, start_date, end_date, uuid) FROM stdin;
\.


--
-- Name: reference_decree_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_decree_id_seq', 1, false);


--
-- Data for Name: reference_domain; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_domain (id, external_id, name, decree_id, parent_id, adhoc, "national", reference, type, uuid) FROM stdin;
\.


--
-- Name: reference_domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_domain_id_seq', 1, false);


--
-- Data for Name: reference_gradetype; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_gradetype (id, external_id, name, coverage, adhoc, institutional, uuid, institutional_grade_type) FROM stdin;
\.


--
-- Name: reference_gradetype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_gradetype_id_seq', 1, false);


--
-- Data for Name: reference_language; Type: TABLE DATA; Schema: public; Owner: test
--

COPY reference_language (id, code, name, external_id, uuid, recognized) FROM stdin;
\.


--
-- Name: reference_language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: test
--

SELECT pg_catalog.setval('reference_language_id_seq', 1, false);


--
-- Name: assistant_academicassistant_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_academicassistant
    ADD CONSTRAINT assistant_academicassistant_pkey PRIMARY KEY (id);


--
-- Name: assistant_assistantdocumentfile_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantdocumentfile
    ADD CONSTRAINT assistant_assistantdocumentfile_pkey PRIMARY KEY (id);


--
-- Name: assistant_assistantmandate_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantmandate
    ADD CONSTRAINT assistant_assistantmandate_pkey PRIMARY KEY (id);


--
-- Name: assistant_manager_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_manager
    ADD CONSTRAINT assistant_manager_pkey PRIMARY KEY (id);


--
-- Name: assistant_mandatestructures_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_mandatestructure
    ADD CONSTRAINT assistant_mandatestructures_pkey PRIMARY KEY (id);


--
-- Name: assistant_message_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_message
    ADD CONSTRAINT assistant_message_pkey PRIMARY KEY (id);


--
-- Name: assistant_review_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_review
    ADD CONSTRAINT assistant_review_pkey PRIMARY KEY (id);


--
-- Name: assistant_reviewer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_reviewer
    ADD CONSTRAINT assistant_reviewer_pkey PRIMARY KEY (id);


--
-- Name: assistant_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_settings
    ADD CONSTRAINT assistant_settings_pkey PRIMARY KEY (id);


--
-- Name: assistant_tutoringlearningunityear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_tutoringlearningunityear
    ADD CONSTRAINT assistant_tutoringlearningunityear_pkey PRIMARY KEY (id);


--
-- Name: attribution_attribution_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attribution
    ADD CONSTRAINT attribution_attribution_pkey PRIMARY KEY (id);


--
-- Name: attribution_attribution_uuid_b8050ddd_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attribution
    ADD CONSTRAINT attribution_attribution_uuid_b8050ddd_uniq UNIQUE (uuid);


--
-- Name: attribution_attributioncharge_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attributioncharge
    ADD CONSTRAINT attribution_attributioncharge_pkey PRIMARY KEY (id);


--
-- Name: attribution_attributioncharge_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attributioncharge
    ADD CONSTRAINT attribution_attributioncharge_uuid_key UNIQUE (uuid);


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_user_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_user_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: base_academiccalendar_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academiccalendar
    ADD CONSTRAINT base_academiccalendar_pkey PRIMARY KEY (id);


--
-- Name: base_academiccalendar_uuid_76fc738f_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academiccalendar
    ADD CONSTRAINT base_academiccalendar_uuid_76fc738f_uniq UNIQUE (uuid);


--
-- Name: base_academicyear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academicyear
    ADD CONSTRAINT base_academicyear_pkey PRIMARY KEY (id);


--
-- Name: base_academicyear_uuid_ba5943c6_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academicyear
    ADD CONSTRAINT base_academicyear_uuid_ba5943c6_uniq UNIQUE (uuid);


--
-- Name: base_academicyear_year_58a67097_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academicyear
    ADD CONSTRAINT base_academicyear_year_58a67097_uniq UNIQUE (year);


--
-- Name: base_applicationnotice_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_applicationnotice
    ADD CONSTRAINT base_applicationnotice_pkey PRIMARY KEY (id);


--
-- Name: base_attribution_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_attribution
    ADD CONSTRAINT base_attribution_pkey PRIMARY KEY (id);


--
-- Name: base_campus_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_campus
    ADD CONSTRAINT base_campus_pkey PRIMARY KEY (id);


--
-- Name: base_campus_uuid_20978423_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_campus
    ADD CONSTRAINT base_campus_uuid_20978423_uniq UNIQUE (uuid);


--
-- Name: base_entity_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entity
    ADD CONSTRAINT base_entity_pkey PRIMARY KEY (id);


--
-- Name: base_entityaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityaddress
    ADD CONSTRAINT base_entityaddress_pkey PRIMARY KEY (id);


--
-- Name: base_entitylink_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitylink
    ADD CONSTRAINT base_entitylink_pkey PRIMARY KEY (id);


--
-- Name: base_entitymanager_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitymanager
    ADD CONSTRAINT base_entitymanager_pkey PRIMARY KEY (id);


--
-- Name: base_entitymanager_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitymanager
    ADD CONSTRAINT base_entitymanager_uuid_key UNIQUE (uuid);


--
-- Name: base_entityversion_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityversion
    ADD CONSTRAINT base_entityversion_pkey PRIMARY KEY (id);


--
-- Name: base_examenrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollment
    ADD CONSTRAINT base_examenrollment_pkey PRIMARY KEY (id);


--
-- Name: base_examenrollmenthistory_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollmenthistory
    ADD CONSTRAINT base_examenrollmenthistory_pkey PRIMARY KEY (id);


--
-- Name: base_externaloffer_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externaloffer_name_key UNIQUE (name);


--
-- Name: base_externaloffer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externaloffer_pkey PRIMARY KEY (id);


--
-- Name: base_externaloffer_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externaloffer_uuid_key UNIQUE (uuid);


--
-- Name: base_learningclass_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclass
    ADD CONSTRAINT base_learningclass_pkey PRIMARY KEY (id);


--
-- Name: base_learningclassyear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclassyear
    ADD CONSTRAINT base_learningclassyear_pkey PRIMARY KEY (id);


--
-- Name: base_learningcomponent_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponent
    ADD CONSTRAINT base_learningcomponent_pkey PRIMARY KEY (id);


--
-- Name: base_learningcomponentyear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponentyear
    ADD CONSTRAINT base_learningcomponentyear_pkey PRIMARY KEY (id);


--
-- Name: base_learningcontainer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontainer
    ADD CONSTRAINT base_learningcontainer_pkey PRIMARY KEY (id);


--
-- Name: base_learningcontaineryear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontaineryear
    ADD CONSTRAINT base_learningcontaineryear_pkey PRIMARY KEY (id);


--
-- Name: base_learningunit_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunit
    ADD CONSTRAINT base_learningunit_pkey PRIMARY KEY (id);


--
-- Name: base_learningunit_uuid_001477ce_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunit
    ADD CONSTRAINT base_learningunit_uuid_001477ce_uniq UNIQUE (uuid);


--
-- Name: base_learningunitcomponent_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponent
    ADD CONSTRAINT base_learningunitcomponent_pkey PRIMARY KEY (id);


--
-- Name: base_learningunitcomponent_uuid_4be8ffce_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponent
    ADD CONSTRAINT base_learningunitcomponent_uuid_4be8ffce_uniq UNIQUE (uuid);


--
-- Name: base_learningunitcomponentclass_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponentclass
    ADD CONSTRAINT base_learningunitcomponentclass_pkey PRIMARY KEY (id);


--
-- Name: base_learningunitenrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitenrollment
    ADD CONSTRAINT base_learningunitenrollment_pkey PRIMARY KEY (id);


--
-- Name: base_learningunitenrollment_uuid_49928d32_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitenrollment
    ADD CONSTRAINT base_learningunitenrollment_uuid_49928d32_uniq UNIQUE (uuid);


--
-- Name: base_learningunityear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT base_learningunityear_pkey PRIMARY KEY (id);


--
-- Name: base_learningunityear_uuid_89910573_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT base_learningunityear_uuid_89910573_uniq UNIQUE (uuid);


--
-- Name: base_offer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offer
    ADD CONSTRAINT base_offer_pkey PRIMARY KEY (id);


--
-- Name: base_offer_uuid_ffa75e38_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offer
    ADD CONSTRAINT base_offer_uuid_ffa75e38_uniq UNIQUE (uuid);


--
-- Name: base_offerenrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offerenrollment
    ADD CONSTRAINT base_offerenrollment_pkey PRIMARY KEY (id);


--
-- Name: base_offerenrollment_uuid_be64765e_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offerenrollment
    ADD CONSTRAINT base_offerenrollment_uuid_be64765e_uniq UNIQUE (uuid);


--
-- Name: base_offertype_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offertype
    ADD CONSTRAINT base_offertype_pkey PRIMARY KEY (id);


--
-- Name: base_offeryear_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_pkey PRIMARY KEY (id);


--
-- Name: base_offeryear_uuid_2af2aeac_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_uuid_2af2aeac_uniq UNIQUE (uuid);


--
-- Name: base_offeryearcalendar_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryearcalendar
    ADD CONSTRAINT base_offeryearcalendar_pkey PRIMARY KEY (id);


--
-- Name: base_offeryeardomain_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryeardomain
    ADD CONSTRAINT base_offeryeardomain_pkey PRIMARY KEY (id);


--
-- Name: base_offeryeardomain_uuid_e5b20a10_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryeardomain
    ADD CONSTRAINT base_offeryeardomain_uuid_e5b20a10_uniq UNIQUE (uuid);


--
-- Name: base_organization_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organization
    ADD CONSTRAINT base_organization_pkey PRIMARY KEY (id);


--
-- Name: base_organization_uuid_22e4f126_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organization
    ADD CONSTRAINT base_organization_uuid_22e4f126_uniq UNIQUE (uuid);


--
-- Name: base_organizationaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organizationaddress
    ADD CONSTRAINT base_organizationaddress_pkey PRIMARY KEY (id);


--
-- Name: base_person_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_person
    ADD CONSTRAINT base_person_pkey PRIMARY KEY (id);


--
-- Name: base_person_user_id_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_person
    ADD CONSTRAINT base_person_user_id_key UNIQUE (user_id);


--
-- Name: base_person_uuid_fe815e36_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_person
    ADD CONSTRAINT base_person_uuid_fe815e36_uniq UNIQUE (uuid);


--
-- Name: base_personaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_personaddress
    ADD CONSTRAINT base_personaddress_pkey PRIMARY KEY (id);


--
-- Name: base_programmanager_person_id_d5423739_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_programmanager
    ADD CONSTRAINT base_programmanager_person_id_d5423739_uniq UNIQUE (person_id, offer_year_id);


--
-- Name: base_programmemanager_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_programmanager
    ADD CONSTRAINT base_programmemanager_pkey PRIMARY KEY (id);


--
-- Name: base_sessionexam_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexam
    ADD CONSTRAINT base_sessionexam_pkey PRIMARY KEY (id);


--
-- Name: base_sessionexamcalendar_number_session_9f897971_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamcalendar
    ADD CONSTRAINT base_sessionexamcalendar_number_session_9f897971_uniq UNIQUE (number_session, academic_calendar_id);


--
-- Name: base_sessionexamcalendar_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamcalendar
    ADD CONSTRAINT base_sessionexamcalendar_pkey PRIMARY KEY (id);


--
-- Name: base_sessionexamdeadline_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamdeadline
    ADD CONSTRAINT base_sessionexamdeadline_pkey PRIMARY KEY (id);


--
-- Name: base_structure_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structure
    ADD CONSTRAINT base_structure_pkey PRIMARY KEY (id);


--
-- Name: base_structureaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structureaddress
    ADD CONSTRAINT base_structureaddress_pkey PRIMARY KEY (id);


--
-- Name: base_student_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_student
    ADD CONSTRAINT base_student_pkey PRIMARY KEY (id);


--
-- Name: base_student_registration_id_bf3893c9_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_student
    ADD CONSTRAINT base_student_registration_id_bf3893c9_uniq UNIQUE (registration_id);


--
-- Name: base_student_uuid_893e7614_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_student
    ADD CONSTRAINT base_student_uuid_893e7614_uniq UNIQUE (uuid);


--
-- Name: base_synchronization_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_synchronization
    ADD CONSTRAINT base_synchronization_pkey PRIMARY KEY (id);


--
-- Name: base_tutor_person_id_f372d4b9_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_tutor
    ADD CONSTRAINT base_tutor_person_id_f372d4b9_uniq UNIQUE (person_id);


--
-- Name: base_tutor_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_tutor
    ADD CONSTRAINT base_tutor_pkey PRIMARY KEY (id);


--
-- Name: base_tutor_uuid_0ae65009_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_tutor
    ADD CONSTRAINT base_tutor_uuid_0ae65009_uniq UNIQUE (uuid);


--
-- Name: cms_textlabel_parent_id_b6b6a51e_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_textlabel
    ADD CONSTRAINT cms_textlabel_parent_id_b6b6a51e_uniq UNIQUE (parent_id, "order");


--
-- Name: cms_textlabel_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_textlabel
    ADD CONSTRAINT cms_textlabel_pkey PRIMARY KEY (id);


--
-- Name: cms_translatedtext_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtext
    ADD CONSTRAINT cms_translatedtext_pkey PRIMARY KEY (id);


--
-- Name: cms_translatedtextlabel_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtextlabel
    ADD CONSTRAINT cms_translatedtextlabel_pkey PRIMARY KEY (id);


--
-- Name: dissertation_adviser_person_id_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_adviser
    ADD CONSTRAINT dissertation_adviser_person_id_key UNIQUE (person_id);


--
-- Name: dissertation_adviser_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_adviser
    ADD CONSTRAINT dissertation_adviser_pkey PRIMARY KEY (id);


--
-- Name: dissertation_adviser_uuid_9511ab9d_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_adviser
    ADD CONSTRAINT dissertation_adviser_uuid_9511ab9d_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertation_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT dissertation_dissertation_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertation_uuid_5a344a45_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT dissertation_dissertation_uuid_5a344a45_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertationdocumentfile_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationdocumentfile
    ADD CONSTRAINT dissertation_dissertationdocumentfile_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertationdocumentfile_uuid_2703645c_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationdocumentfile
    ADD CONSTRAINT dissertation_dissertationdocumentfile_uuid_2703645c_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertationgroup_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationgroup
    ADD CONSTRAINT dissertation_dissertationgroup_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertationgroup_uuid_322215af_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationgroup
    ADD CONSTRAINT dissertation_dissertationgroup_uuid_322215af_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertationlocation_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationlocation
    ADD CONSTRAINT dissertation_dissertationlocation_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertationlocation_uuid_cdf6ad94_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationlocation
    ADD CONSTRAINT dissertation_dissertationlocation_uuid_cdf6ad94_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertationrole_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationrole
    ADD CONSTRAINT dissertation_dissertationrole_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertationrole_uuid_c1c6624f_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationrole
    ADD CONSTRAINT dissertation_dissertationrole_uuid_c1c6624f_uniq UNIQUE (uuid);


--
-- Name: dissertation_dissertationupdate_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationupdate
    ADD CONSTRAINT dissertation_dissertationupdate_pkey PRIMARY KEY (id);


--
-- Name: dissertation_dissertationupdate_uuid_059c34cd_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationupdate
    ADD CONSTRAINT dissertation_dissertationupdate_uuid_059c34cd_uniq UNIQUE (uuid);


--
-- Name: dissertation_facultyadviser_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_facultyadviser
    ADD CONSTRAINT dissertation_facultyadviser_pkey PRIMARY KEY (id);


--
-- Name: dissertation_offerproposition_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_offerproposition
    ADD CONSTRAINT dissertation_offerproposition_pkey PRIMARY KEY (id);


--
-- Name: dissertation_offerproposition_uuid_37ba3afb_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_offerproposition
    ADD CONSTRAINT dissertation_offerproposition_uuid_37ba3afb_uniq UNIQUE (uuid);


--
-- Name: dissertation_propositiondissertation_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondissertation
    ADD CONSTRAINT dissertation_propositiondissertation_pkey PRIMARY KEY (id);


--
-- Name: dissertation_propositiondissertation_uuid_d2bac811_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondissertation
    ADD CONSTRAINT dissertation_propositiondissertation_uuid_d2bac811_uniq UNIQUE (uuid);


--
-- Name: dissertation_propositiondocumentfile_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondocumentfile
    ADD CONSTRAINT dissertation_propositiondocumentfile_pkey PRIMARY KEY (id);


--
-- Name: dissertation_propositiondocumentfile_uuid_7228d1a8_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondocumentfile
    ADD CONSTRAINT dissertation_propositiondocumentfile_uuid_7228d1a8_uniq UNIQUE (uuid);


--
-- Name: dissertation_propositionoffer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionoffer
    ADD CONSTRAINT dissertation_propositionoffer_pkey PRIMARY KEY (id);


--
-- Name: dissertation_propositionoffer_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionoffer
    ADD CONSTRAINT dissertation_propositionoffer_uuid_key UNIQUE (uuid);


--
-- Name: dissertation_propositionrole_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionrole
    ADD CONSTRAINT dissertation_propositionrole_pkey PRIMARY KEY (id);


--
-- Name: dissertation_propositionrole_uuid_f778c8b2_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionrole
    ADD CONSTRAINT dissertation_propositionrole_uuid_f778c8b2_uniq UNIQUE (uuid);


--
-- Name: internship_affectationgenerationtime_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_affectationgenerationtime
    ADD CONSTRAINT internship_affectationgenerationtime_pkey PRIMARY KEY (id);


--
-- Name: internship_cohort_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_cohort
    ADD CONSTRAINT internship_cohort_pkey PRIMARY KEY (id);


--
-- Name: internship_cohort_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_cohort
    ADD CONSTRAINT internship_cohort_uuid_key UNIQUE (uuid);


--
-- Name: internship_internship_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship
    ADD CONSTRAINT internship_internship_pkey PRIMARY KEY (id);


--
-- Name: internship_internship_uuid_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship
    ADD CONSTRAINT internship_internship_uuid_key UNIQUE (uuid);


--
-- Name: internship_internshipchoice_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internship_internshipchoice_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipchoice_student_id_b93d68f7_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internship_internshipchoice_student_id_b93d68f7_uniq UNIQUE (student_id, internship_id, choice);


--
-- Name: internship_internshipchoice_uuid_dd043857_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internship_internshipchoice_uuid_dd043857_uniq UNIQUE (uuid);


--
-- Name: internship_internshipenrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT internship_internshipenrollment_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipmaster_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipmaster
    ADD CONSTRAINT internship_internshipmaster_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipmaster_uuid_ff71910c_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipmaster
    ADD CONSTRAINT internship_internshipmaster_uuid_ff71910c_uniq UNIQUE (uuid);


--
-- Name: internship_internshipoffer_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT internship_internshipoffer_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipoffer_uuid_74ec6685_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT internship_internshipoffer_uuid_74ec6685_uniq UNIQUE (uuid);


--
-- Name: internship_internshipspeciality_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspeciality
    ADD CONSTRAINT internship_internshipspeciality_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipspeciality_uuid_766c8cb9_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspeciality
    ADD CONSTRAINT internship_internshipspeciality_uuid_766c8cb9_uniq UNIQUE (uuid);


--
-- Name: internship_internshipspecialitygroup_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroup
    ADD CONSTRAINT internship_internshipspecialitygroup_name_key UNIQUE (name);


--
-- Name: internship_internshipspecialitygroup_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroup
    ADD CONSTRAINT internship_internshipspecialitygroup_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipspecialitygroupmember_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroupmember
    ADD CONSTRAINT internship_internshipspecialitygroupmember_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipstudentaffectationstat_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT internship_internshipstudentaffectationstat_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipstudentaffectationstat_uuid_354cede8_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT internship_internshipstudentaffectationstat_uuid_354cede8_uniq UNIQUE (uuid);


--
-- Name: internship_internshipstudentinformation_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentinformation
    ADD CONSTRAINT internship_internshipstudentinformation_pkey PRIMARY KEY (id);


--
-- Name: internship_internshipstudentinformation_uuid_b1fe941e_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentinformation
    ADD CONSTRAINT internship_internshipstudentinformation_uuid_b1fe941e_uniq UNIQUE (uuid);


--
-- Name: internship_organization_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organization
    ADD CONSTRAINT internship_organization_pkey PRIMARY KEY (id);


--
-- Name: internship_organization_uuid_ff2ffab9_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organization
    ADD CONSTRAINT internship_organization_uuid_ff2ffab9_uniq UNIQUE (uuid);


--
-- Name: internship_organizationaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organizationaddress
    ADD CONSTRAINT internship_organizationaddress_pkey PRIMARY KEY (id);


--
-- Name: internship_organizationaddress_uuid_db4cade6_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organizationaddress
    ADD CONSTRAINT internship_organizationaddress_uuid_db4cade6_uniq UNIQUE (uuid);


--
-- Name: internship_period_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_period
    ADD CONSTRAINT internship_period_pkey PRIMARY KEY (id);


--
-- Name: internship_period_uuid_1f7ed3c8_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_period
    ADD CONSTRAINT internship_period_uuid_1f7ed3c8_uniq UNIQUE (uuid);


--
-- Name: internship_periodinternshipplaces_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_periodinternshipplaces
    ADD CONSTRAINT internship_periodinternshipplaces_pkey PRIMARY KEY (id);


--
-- Name: internship_periodinternshipplaces_uuid_543399eb_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_periodinternshipplaces
    ADD CONSTRAINT internship_periodinternshipplaces_uuid_543399eb_uniq UNIQUE (uuid);


--
-- Name: osis_common_documentfile_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_documentfile
    ADD CONSTRAINT osis_common_documentfile_pkey PRIMARY KEY (id);


--
-- Name: osis_common_documentfile_uuid_04578955_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_documentfile
    ADD CONSTRAINT osis_common_documentfile_uuid_04578955_uniq UNIQUE (uuid);


--
-- Name: osis_common_messagehistory_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_messagehistory
    ADD CONSTRAINT osis_common_messagehistory_pkey PRIMARY KEY (id);


--
-- Name: osis_common_messagetemplate_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_messagetemplate
    ADD CONSTRAINT osis_common_messagetemplate_pkey PRIMARY KEY (id);


--
-- Name: osis_common_messagetemplate_reference_6375cf66_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_messagetemplate
    ADD CONSTRAINT osis_common_messagetemplate_reference_6375cf66_uniq UNIQUE (reference, language);


--
-- Name: osis_common_queueexception_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY osis_common_queueexception
    ADD CONSTRAINT osis_common_queueexception_pkey PRIMARY KEY (id);


--
-- Name: reference_continent_code_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_continent
    ADD CONSTRAINT reference_continent_code_key UNIQUE (code);


--
-- Name: reference_continent_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_continent
    ADD CONSTRAINT reference_continent_pkey PRIMARY KEY (id);


--
-- Name: reference_country_iso_code_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_country_iso_code_key UNIQUE (iso_code);


--
-- Name: reference_country_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_country_name_key UNIQUE (name);


--
-- Name: reference_country_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_country_pkey PRIMARY KEY (id);


--
-- Name: reference_country_uuid_7308ebf7_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_country_uuid_7308ebf7_uniq UNIQUE (uuid);


--
-- Name: reference_currency_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_currency
    ADD CONSTRAINT reference_currency_name_key UNIQUE (name);


--
-- Name: reference_currency_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_currency
    ADD CONSTRAINT reference_currency_pkey PRIMARY KEY (id);


--
-- Name: reference_decree_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_decree
    ADD CONSTRAINT reference_decree_name_key UNIQUE (name);


--
-- Name: reference_decree_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_decree
    ADD CONSTRAINT reference_decree_pkey PRIMARY KEY (id);


--
-- Name: reference_decree_uuid_a66a3eeb_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_decree
    ADD CONSTRAINT reference_decree_uuid_a66a3eeb_uniq UNIQUE (uuid);


--
-- Name: reference_domain_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_domain
    ADD CONSTRAINT reference_domain_pkey PRIMARY KEY (id);


--
-- Name: reference_domain_uuid_2056b331_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_domain
    ADD CONSTRAINT reference_domain_uuid_2056b331_uniq UNIQUE (uuid);


--
-- Name: reference_gradetype_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_gradetype
    ADD CONSTRAINT reference_gradetype_pkey PRIMARY KEY (id);


--
-- Name: reference_gradetype_uuid_c7ef016a_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_gradetype
    ADD CONSTRAINT reference_gradetype_uuid_c7ef016a_uniq UNIQUE (uuid);


--
-- Name: reference_language_code_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_language
    ADD CONSTRAINT reference_language_code_key UNIQUE (code);


--
-- Name: reference_language_name_key; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_language
    ADD CONSTRAINT reference_language_name_key UNIQUE (name);


--
-- Name: reference_language_pkey; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_language
    ADD CONSTRAINT reference_language_pkey PRIMARY KEY (id);


--
-- Name: reference_language_uuid_706ce947_uniq; Type: CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_language
    ADD CONSTRAINT reference_language_uuid_706ce947_uniq UNIQUE (uuid);


--
-- Name: assistant_academicassistant_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_academicassistant_a8452ca7 ON assistant_academicassistant USING btree (person_id);


--
-- Name: assistant_academicassistant_eae0a89e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_academicassistant_eae0a89e ON assistant_academicassistant USING btree (supervisor_id);


--
-- Name: assistant_assistantdocumentfile_4e64dbbe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_assistantdocumentfile_4e64dbbe ON assistant_assistantdocumentfile USING btree (document_file_id);


--
-- Name: assistant_assistantdocumentfile_d0f2b350; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_assistantdocumentfile_d0f2b350 ON assistant_assistantdocumentfile USING btree (assistant_mandate_id);


--
-- Name: assistant_assistantmandate_3e097836; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_assistantmandate_3e097836 ON assistant_assistantmandate USING btree (assistant_id);


--
-- Name: assistant_assistantmandate_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_assistantmandate_49dbeeac ON assistant_assistantmandate USING btree (academic_year_id);


--
-- Name: assistant_manager_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_manager_a8452ca7 ON assistant_manager USING btree (person_id);


--
-- Name: assistant_mandatestructures_d0f2b350; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_mandatestructures_d0f2b350 ON assistant_mandatestructure USING btree (assistant_mandate_id);


--
-- Name: assistant_mandatestructures_e57b64e6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_mandatestructures_e57b64e6 ON assistant_mandatestructure USING btree (structure_id);


--
-- Name: assistant_message_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_message_49dbeeac ON assistant_message USING btree (academic_year_id);


--
-- Name: assistant_message_924b1846; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_message_924b1846 ON assistant_message USING btree (sender_id);


--
-- Name: assistant_review_071d8141; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_review_071d8141 ON assistant_review USING btree (reviewer_id);


--
-- Name: assistant_review_cc4089b5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_review_cc4089b5 ON assistant_review USING btree (mandate_id);


--
-- Name: assistant_reviewer_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_reviewer_a8452ca7 ON assistant_reviewer USING btree (person_id);


--
-- Name: assistant_reviewer_e57b64e6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_reviewer_e57b64e6 ON assistant_reviewer USING btree (structure_id);


--
-- Name: assistant_tutoringlearningunityear_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_tutoringlearningunityear_8f481aea ON assistant_tutoringlearningunityear USING btree (learning_unit_year_id);


--
-- Name: assistant_tutoringlearningunityear_cc4089b5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX assistant_tutoringlearningunityear_cc4089b5 ON assistant_tutoringlearningunityear USING btree (mandate_id);


--
-- Name: attribution_attribution_1ba55b7f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attribution_1ba55b7f ON attribution_attribution USING btree (tutor_id);


--
-- Name: attribution_attribution_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attribution_8f481aea ON attribution_attribution USING btree (learning_unit_year_id);


--
-- Name: attribution_attribution_c1c42526; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attribution_c1c42526 ON attribution_attribution USING btree (function);


--
-- Name: attribution_attribution_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attribution_ef7c876f ON attribution_attribution USING btree (uuid);


--
-- Name: attribution_attribution_function_203807a6_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attribution_function_203807a6_like ON attribution_attribution USING btree (function varchar_pattern_ops);


--
-- Name: attribution_attributioncharge_0fd8863c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attributioncharge_0fd8863c ON attribution_attributioncharge USING btree (learning_unit_component_id);


--
-- Name: attribution_attributioncharge_95690556; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX attribution_attributioncharge_95690556 ON attribution_attributioncharge USING btree (attribution_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_group_name_a6ea08ec_like ON auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_0e939a4f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_group_permissions_0e939a4f ON auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_8373b171; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_group_permissions_8373b171 ON auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_417f1b1c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_permission_417f1b1c ON auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_0e939a4f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_user_groups_0e939a4f ON auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_e8701ad4; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_user_groups_e8701ad4 ON auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_8373b171; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_user_user_permissions_8373b171 ON auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_e8701ad4; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_user_user_permissions_e8701ad4 ON auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX auth_user_username_6821ab7c_like ON auth_user USING btree (username varchar_pattern_ops);


--
-- Name: base_academiccalendar_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_academiccalendar_49dbeeac ON base_academiccalendar USING btree (academic_year_id);


--
-- Name: base_academiccalendar_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_academiccalendar_ef7c876f ON base_academiccalendar USING btree (uuid);


--
-- Name: base_academicyear_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_academicyear_ef7c876f ON base_academicyear USING btree (uuid);


--
-- Name: base_attribution_1ba55b7f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_attribution_1ba55b7f ON base_attribution USING btree (tutor_id);


--
-- Name: base_attribution_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_attribution_8f481aea ON base_attribution USING btree (learning_unit_year_id);


--
-- Name: base_attribution_function_1878a039_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_attribution_function_1878a039_uniq ON base_attribution USING btree (function);


--
-- Name: base_campus_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_campus_26b2345e ON base_campus USING btree (organization_id);


--
-- Name: base_campus_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_campus_ef7c876f ON base_campus USING btree (uuid);


--
-- Name: base_entity_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entity_26b2345e ON base_entity USING btree (organization_id);


--
-- Name: base_entityaddress_dffc4713; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityaddress_dffc4713 ON base_entityaddress USING btree (entity_id);


--
-- Name: base_entitylink_6be37982; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitylink_6be37982 ON base_entitylink USING btree (parent_id);


--
-- Name: base_entitylink_90e8da89; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitylink_90e8da89 ON base_entitylink USING btree (end_date);


--
-- Name: base_entitylink_eadbb911; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitylink_eadbb911 ON base_entitylink USING btree (start_date);


--
-- Name: base_entitylink_f36263a3; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitylink_f36263a3 ON base_entitylink USING btree (child_id);


--
-- Name: base_entitymanager_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitymanager_a8452ca7 ON base_entitymanager USING btree (person_id);


--
-- Name: base_entitymanager_e57b64e6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entitymanager_e57b64e6 ON base_entitymanager USING btree (structure_id);


--
-- Name: base_entityversion_89111891; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityversion_89111891 ON base_entityversion USING btree (entity_type);


--
-- Name: base_entityversion_90e8da89; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityversion_90e8da89 ON base_entityversion USING btree (end_date);


--
-- Name: base_entityversion_dffc4713; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityversion_dffc4713 ON base_entityversion USING btree (entity_id);


--
-- Name: base_entityversion_eadbb911; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityversion_eadbb911 ON base_entityversion USING btree (start_date);


--
-- Name: base_entityversion_entity_type_b8f727a5_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_entityversion_entity_type_b8f727a5_like ON base_entityversion USING btree (entity_type varchar_pattern_ops);


--
-- Name: base_examenrollment_191591a5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_examenrollment_191591a5 ON base_examenrollment USING btree (learning_unit_enrollment_id);


--
-- Name: base_examenrollment_318220af; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_examenrollment_318220af ON base_examenrollment USING btree (session_exam_id);


--
-- Name: base_examenrollment_enrollment_state_6b5ea3d7_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_examenrollment_enrollment_state_6b5ea3d7_uniq ON base_examenrollment USING btree (enrollment_state);


--
-- Name: base_examenrollmenthistory_5f9bcd77; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_examenrollmenthistory_5f9bcd77 ON base_examenrollmenthistory USING btree (exam_enrollment_id);


--
-- Name: base_examenrollmenthistory_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_examenrollmenthistory_a8452ca7 ON base_examenrollmenthistory USING btree (person_id);


--
-- Name: base_externaloffer_336ac850; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_externaloffer_336ac850 ON base_externaloffer USING btree (grade_type_id);


--
-- Name: base_externaloffer_662cbf12; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_externaloffer_662cbf12 ON base_externaloffer USING btree (domain_id);


--
-- Name: base_externaloffer_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_externaloffer_b566372e ON base_externaloffer USING btree (offer_year_id);


--
-- Name: base_externaloffer_name_0413b48b_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_externaloffer_name_0413b48b_like ON base_externaloffer USING btree (name varchar_pattern_ops);


--
-- Name: base_learningclass_b844eacc; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningclass_b844eacc ON base_learningclass USING btree (learning_component_id);


--
-- Name: base_learningclassyear_3cb65d9e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningclassyear_3cb65d9e ON base_learningclassyear USING btree (learning_class_id);


--
-- Name: base_learningclassyear_5a8774d3; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningclassyear_5a8774d3 ON base_learningclassyear USING btree (learning_component_year_id);


--
-- Name: base_learningcomponent_b4b713c2; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningcomponent_b4b713c2 ON base_learningcomponent USING btree (learning_container_id);


--
-- Name: base_learningcomponentyear_b844eacc; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningcomponentyear_b844eacc ON base_learningcomponentyear USING btree (learning_component_id);


--
-- Name: base_learningcomponentyear_e967dc59; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningcomponentyear_e967dc59 ON base_learningcomponentyear USING btree (learning_container_year_id);


--
-- Name: base_learningcontaineryear_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningcontaineryear_49dbeeac ON base_learningcontaineryear USING btree (academic_year_id);


--
-- Name: base_learningcontaineryear_b4b713c2; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningcontaineryear_b4b713c2 ON base_learningcontaineryear USING btree (learning_container_id);


--
-- Name: base_learningunit_b4b713c2; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunit_b4b713c2 ON base_learningunit USING btree (learning_container_id);


--
-- Name: base_learningunit_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunit_ef7c876f ON base_learningunit USING btree (uuid);


--
-- Name: base_learningunitcomponent_599dcce2; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponent_599dcce2 ON base_learningunitcomponent USING btree (type);


--
-- Name: base_learningunitcomponent_5a8774d3; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponent_5a8774d3 ON base_learningunitcomponent USING btree (learning_component_year_id);


--
-- Name: base_learningunitcomponent_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponent_8f481aea ON base_learningunitcomponent USING btree (learning_unit_year_id);


--
-- Name: base_learningunitcomponent_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponent_ef7c876f ON base_learningunitcomponent USING btree (uuid);


--
-- Name: base_learningunitcomponent_type_32f3277c_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponent_type_32f3277c_like ON base_learningunitcomponent USING btree (type varchar_pattern_ops);


--
-- Name: base_learningunitcomponentclass_0fd8863c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponentclass_0fd8863c ON base_learningunitcomponentclass USING btree (learning_unit_component_id);


--
-- Name: base_learningunitcomponentclass_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitcomponentclass_8f481aea ON base_learningunitcomponentclass USING btree (learning_unit_year_id);


--
-- Name: base_learningunitenrollment_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitenrollment_8f481aea ON base_learningunitenrollment USING btree (learning_unit_year_id);


--
-- Name: base_learningunitenrollment_ea4ba73c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitenrollment_ea4ba73c ON base_learningunitenrollment USING btree (offer_enrollment_id);


--
-- Name: base_learningunitenrollment_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunitenrollment_ef7c876f ON base_learningunitenrollment USING btree (uuid);


--
-- Name: base_learningunityear_14de9abe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_14de9abe ON base_learningunityear USING btree (learning_unit_id);


--
-- Name: base_learningunityear_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_49dbeeac ON base_learningunityear USING btree (academic_year_id);


--
-- Name: base_learningunityear_acronym_9994f074_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_acronym_9994f074_uniq ON base_learningunityear USING btree (acronym);


--
-- Name: base_learningunityear_e57b64e6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_e57b64e6 ON base_learningunityear USING btree (structure_id);


--
-- Name: base_learningunityear_e967dc59; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_e967dc59 ON base_learningunityear USING btree (learning_container_year_id);


--
-- Name: base_learningunityear_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_learningunityear_ef7c876f ON base_learningunityear USING btree (uuid);


--
-- Name: base_offer_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offer_ef7c876f ON base_offer USING btree (uuid);


--
-- Name: base_offerenrollment_30a811f6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offerenrollment_30a811f6 ON base_offerenrollment USING btree (student_id);


--
-- Name: base_offerenrollment_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offerenrollment_b566372e ON base_offerenrollment USING btree (offer_year_id);


--
-- Name: base_offerenrollment_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offerenrollment_ef7c876f ON base_offerenrollment USING btree (uuid);


--
-- Name: base_offeryear_29ddca3f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_29ddca3f ON base_offeryear USING btree (campus_id);


--
-- Name: base_offeryear_2a7ad5b7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_2a7ad5b7 ON base_offeryear USING btree (entity_administration_fac_id);


--
-- Name: base_offeryear_336ac850; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_336ac850 ON base_offeryear USING btree (grade_type_id);


--
-- Name: base_offeryear_49dbeeac; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_49dbeeac ON base_offeryear USING btree (academic_year_id);


--
-- Name: base_offeryear_60fd0540; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_60fd0540 ON base_offeryear USING btree (entity_administration_id);


--
-- Name: base_offeryear_84aea698; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_84aea698 ON base_offeryear USING btree (parent_id);


--
-- Name: base_offeryear_93bfec8a; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_93bfec8a ON base_offeryear USING btree (country_id);


--
-- Name: base_offeryear_acronym_a0928d58_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_acronym_a0928d58_uniq ON base_offeryear USING btree (acronym);


--
-- Name: base_offeryear_b55f1917; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_b55f1917 ON base_offeryear USING btree (offer_type_id);


--
-- Name: base_offeryear_bf98d991; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_bf98d991 ON base_offeryear USING btree (offer_id);


--
-- Name: base_offeryear_e9c49dff; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_e9c49dff ON base_offeryear USING btree (entity_management_id);


--
-- Name: base_offeryear_eb7fa262; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_eb7fa262 ON base_offeryear USING btree (entity_management_fac_id);


--
-- Name: base_offeryear_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryear_ef7c876f ON base_offeryear USING btree (uuid);


--
-- Name: base_offeryearcalendar_1b7d2692; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryearcalendar_1b7d2692 ON base_offeryearcalendar USING btree (academic_calendar_id);


--
-- Name: base_offeryearcalendar_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryearcalendar_b566372e ON base_offeryearcalendar USING btree (offer_year_id);


--
-- Name: base_offeryearcalendar_end_date_55b3f9cf_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryearcalendar_end_date_55b3f9cf_uniq ON base_offeryearcalendar USING btree (end_date);


--
-- Name: base_offeryearcalendar_start_date_014725ff_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryearcalendar_start_date_014725ff_uniq ON base_offeryearcalendar USING btree (start_date);


--
-- Name: base_offeryeardomain_662cbf12; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryeardomain_662cbf12 ON base_offeryeardomain USING btree (domain_id);


--
-- Name: base_offeryeardomain_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryeardomain_b566372e ON base_offeryeardomain USING btree (offer_year_id);


--
-- Name: base_offeryeardomain_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_offeryeardomain_ef7c876f ON base_offeryeardomain USING btree (uuid);


--
-- Name: base_organization_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_organization_ef7c876f ON base_organization USING btree (uuid);


--
-- Name: base_organizationaddress_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_organizationaddress_26b2345e ON base_organizationaddress USING btree (organization_id);


--
-- Name: base_organizationaddress_country_id_de0c1553_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_organizationaddress_country_id_de0c1553_uniq ON base_organizationaddress USING btree (country_id);


--
-- Name: base_person_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_person_ef7c876f ON base_person USING btree (uuid);


--
-- Name: base_person_first_name_f84f5aae_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_person_first_name_f84f5aae_uniq ON base_person USING btree (first_name);


--
-- Name: base_person_global_id_8f6ee21f_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_person_global_id_8f6ee21f_uniq ON base_person USING btree (global_id);


--
-- Name: base_person_last_name_5c5afd05_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_person_last_name_5c5afd05_uniq ON base_person USING btree (last_name);


--
-- Name: base_personaddress_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_personaddress_a8452ca7 ON base_personaddress USING btree (person_id);


--
-- Name: base_personaddress_country_id_b0da720a_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_personaddress_country_id_b0da720a_uniq ON base_personaddress USING btree (country_id);


--
-- Name: base_programmemanager_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_programmemanager_a8452ca7 ON base_programmanager USING btree (person_id);


--
-- Name: base_programmemanager_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_programmemanager_b566372e ON base_programmanager USING btree (offer_year_id);


--
-- Name: base_sessionexam_8f481aea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_sessionexam_8f481aea ON base_sessionexam USING btree (learning_unit_year_id);


--
-- Name: base_sessionexam_b566372e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_sessionexam_b566372e ON base_sessionexam USING btree (offer_year_id);


--
-- Name: base_sessionexamcalendar_1b7d2692; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_sessionexamcalendar_1b7d2692 ON base_sessionexamcalendar USING btree (academic_calendar_id);


--
-- Name: base_sessionexamdeadline_ea4ba73c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_sessionexamdeadline_ea4ba73c ON base_sessionexamdeadline USING btree (offer_enrollment_id);


--
-- Name: base_structure_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_structure_26b2345e ON base_structure USING btree (organization_id);


--
-- Name: base_structure_6cad1465; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_structure_6cad1465 ON base_structure USING btree (part_of_id);


--
-- Name: base_structureaddress_93bfec8a; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_structureaddress_93bfec8a ON base_structureaddress USING btree (country_id);


--
-- Name: base_structureaddress_e57b64e6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_structureaddress_e57b64e6 ON base_structureaddress USING btree (structure_id);


--
-- Name: base_student_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_student_a8452ca7 ON base_student USING btree (person_id);


--
-- Name: base_student_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_student_ef7c876f ON base_student USING btree (uuid);


--
-- Name: base_tutor_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_tutor_a8452ca7 ON base_tutor USING btree (person_id);


--
-- Name: base_tutor_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX base_tutor_ef7c876f ON base_tutor USING btree (uuid);


--
-- Name: cms_textlabel_6be37982; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_textlabel_6be37982 ON cms_textlabel USING btree (parent_id);


--
-- Name: cms_translatedtext_468679bd; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtext_468679bd ON cms_translatedtext USING btree (language_id);


--
-- Name: cms_translatedtext_b74445fa; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtext_b74445fa ON cms_translatedtext USING btree (text_label_id);


--
-- Name: cms_translatedtext_b8af13ea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtext_b8af13ea ON cms_translatedtext USING btree (reference);


--
-- Name: cms_translatedtext_entity_03a0390d_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtext_entity_03a0390d_like ON cms_translatedtext USING btree (entity varchar_pattern_ops);


--
-- Name: cms_translatedtext_f5e638cc; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtext_f5e638cc ON cms_translatedtext USING btree (entity);


--
-- Name: cms_translatedtextlabel_468679bd; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtextlabel_468679bd ON cms_translatedtextlabel USING btree (language_id);


--
-- Name: cms_translatedtextlabel_b74445fa; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX cms_translatedtextlabel_b74445fa ON cms_translatedtextlabel USING btree (text_label_id);


--
-- Name: dissertation_adviser_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_adviser_ef7c876f ON dissertation_adviser USING btree (uuid);


--
-- Name: dissertation_dissertation_153cff5e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertation_153cff5e ON dissertation_dissertation USING btree (proposition_dissertation_id);


--
-- Name: dissertation_dissertation_4f331e2f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertation_4f331e2f ON dissertation_dissertation USING btree (author_id);


--
-- Name: dissertation_dissertation_84360e05; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertation_84360e05 ON dissertation_dissertation USING btree (offer_year_start_id);


--
-- Name: dissertation_dissertation_e274a5da; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertation_e274a5da ON dissertation_dissertation USING btree (location_id);


--
-- Name: dissertation_dissertation_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertation_ef7c876f ON dissertation_dissertation USING btree (uuid);


--
-- Name: dissertation_dissertationdocumentfile_1652213b; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationdocumentfile_1652213b ON dissertation_dissertationdocumentfile USING btree (dissertation_id);


--
-- Name: dissertation_dissertationdocumentfile_4e64dbbe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationdocumentfile_4e64dbbe ON dissertation_dissertationdocumentfile USING btree (document_file_id);


--
-- Name: dissertation_dissertationdocumentfile_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationdocumentfile_ef7c876f ON dissertation_dissertationdocumentfile USING btree (uuid);


--
-- Name: dissertation_dissertationgroup_1652213b; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationgroup_1652213b ON dissertation_dissertationgroup USING btree (dissertation_id);


--
-- Name: dissertation_dissertationgroup_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationgroup_ef7c876f ON dissertation_dissertationgroup USING btree (uuid);


--
-- Name: dissertation_dissertationlocation_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationlocation_ef7c876f ON dissertation_dissertationlocation USING btree (uuid);


--
-- Name: dissertation_dissertationrole_1652213b; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationrole_1652213b ON dissertation_dissertationrole USING btree (dissertation_id);


--
-- Name: dissertation_dissertationrole_ab325e44; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationrole_ab325e44 ON dissertation_dissertationrole USING btree (adviser_id);


--
-- Name: dissertation_dissertationrole_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationrole_ef7c876f ON dissertation_dissertationrole USING btree (uuid);


--
-- Name: dissertation_dissertationupdate_1652213b; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationupdate_1652213b ON dissertation_dissertationupdate USING btree (dissertation_id);


--
-- Name: dissertation_dissertationupdate_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationupdate_a8452ca7 ON dissertation_dissertationupdate USING btree (person_id);


--
-- Name: dissertation_dissertationupdate_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_dissertationupdate_ef7c876f ON dissertation_dissertationupdate USING btree (uuid);


--
-- Name: dissertation_facultyadviser_ab325e44; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_facultyadviser_ab325e44 ON dissertation_facultyadviser USING btree (adviser_id);


--
-- Name: dissertation_facultyadviser_bf98d991; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_facultyadviser_bf98d991 ON dissertation_facultyadviser USING btree (offer_id);


--
-- Name: dissertation_offerproposition_bf98d991; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_offerproposition_bf98d991 ON dissertation_offerproposition USING btree (offer_id);


--
-- Name: dissertation_offerproposition_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_offerproposition_ef7c876f ON dissertation_offerproposition USING btree (uuid);


--
-- Name: dissertation_propositiondissertation_3700153c; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondissertation_3700153c ON dissertation_propositiondissertation USING btree (creator_id);


--
-- Name: dissertation_propositiondissertation_4f331e2f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondissertation_4f331e2f ON dissertation_propositiondissertation USING btree (author_id);


--
-- Name: dissertation_propositiondissertation_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondissertation_ef7c876f ON dissertation_propositiondissertation USING btree (uuid);


--
-- Name: dissertation_propositiondocumentfile_4e64dbbe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondocumentfile_4e64dbbe ON dissertation_propositiondocumentfile USING btree (document_file_id);


--
-- Name: dissertation_propositiondocumentfile_b508a2ca; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondocumentfile_b508a2ca ON dissertation_propositiondocumentfile USING btree (proposition_id);


--
-- Name: dissertation_propositiondocumentfile_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositiondocumentfile_ef7c876f ON dissertation_propositiondocumentfile USING btree (uuid);


--
-- Name: dissertation_propositionoffer_153cff5e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositionoffer_153cff5e ON dissertation_propositionoffer USING btree (proposition_dissertation_id);


--
-- Name: dissertation_propositionoffer_d952620d; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositionoffer_d952620d ON dissertation_propositionoffer USING btree (offer_proposition_id);


--
-- Name: dissertation_propositionrole_153cff5e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositionrole_153cff5e ON dissertation_propositionrole USING btree (proposition_dissertation_id);


--
-- Name: dissertation_propositionrole_ab325e44; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositionrole_ab325e44 ON dissertation_propositionrole USING btree (adviser_id);


--
-- Name: dissertation_propositionrole_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX dissertation_propositionrole_ef7c876f ON dissertation_propositionrole USING btree (uuid);


--
-- Name: internship_affectationgenerationtime_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_affectationgenerationtime_68b226f5 ON internship_affectationgenerationtime USING btree (cohort_id);


--
-- Name: internship_internship_3651b9a9; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internship_3651b9a9 ON internship_internship USING btree (alternate_speciality_id);


--
-- Name: internship_internship_66db61fe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internship_66db61fe ON internship_internship USING btree (speciality_id);


--
-- Name: internship_internship_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internship_68b226f5 ON internship_internship USING btree (cohort_id);


--
-- Name: internship_internshipchoice_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipchoice_26b2345e ON internship_internshipchoice USING btree (organization_id);


--
-- Name: internship_internshipchoice_30a811f6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipchoice_30a811f6 ON internship_internshipchoice USING btree (student_id);


--
-- Name: internship_internshipchoice_66db61fe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipchoice_66db61fe ON internship_internshipchoice USING btree (speciality_id);


--
-- Name: internship_internshipchoice_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipchoice_ef7c876f ON internship_internshipchoice USING btree (uuid);


--
-- Name: internship_internshipchoice_internship_id_4d2fcaed_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipchoice_internship_id_4d2fcaed_uniq ON internship_internshipchoice USING btree (internship_id);


--
-- Name: internship_internshipenrollment_19222166; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipenrollment_19222166 ON internship_internshipenrollment USING btree (internship_offer_id);


--
-- Name: internship_internshipenrollment_30a811f6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipenrollment_30a811f6 ON internship_internshipenrollment USING btree (student_id);


--
-- Name: internship_internshipenrollment_62becf4a; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipenrollment_62becf4a ON internship_internshipenrollment USING btree (place_id);


--
-- Name: internship_internshipenrollment_b1efa79f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipenrollment_b1efa79f ON internship_internshipenrollment USING btree (period_id);


--
-- Name: internship_internshipenrollment_internship_id_f42380a3_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipenrollment_internship_id_f42380a3_uniq ON internship_internshipenrollment USING btree (internship_id);


--
-- Name: internship_internshipmaster_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipmaster_26b2345e ON internship_internshipmaster USING btree (organization_id);


--
-- Name: internship_internshipmaster_2a034e9d; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipmaster_2a034e9d ON internship_internshipmaster USING btree (first_name);


--
-- Name: internship_internshipmaster_7d4553c0; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipmaster_7d4553c0 ON internship_internshipmaster USING btree (last_name);


--
-- Name: internship_internshipmaster_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipmaster_ef7c876f ON internship_internshipmaster USING btree (uuid);


--
-- Name: internship_internshipoffer_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipoffer_26b2345e ON internship_internshipoffer USING btree (organization_id);


--
-- Name: internship_internshipoffer_66db61fe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipoffer_66db61fe ON internship_internshipoffer USING btree (speciality_id);


--
-- Name: internship_internshipoffer_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipoffer_68b226f5 ON internship_internshipoffer USING btree (cohort_id);


--
-- Name: internship_internshipoffer_ccd05cf1; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipoffer_ccd05cf1 ON internship_internshipoffer USING btree (internship_id);


--
-- Name: internship_internshipoffer_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipoffer_ef7c876f ON internship_internshipoffer USING btree (uuid);


--
-- Name: internship_internshipspeciality_14de9abe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspeciality_14de9abe ON internship_internshipspeciality USING btree (learning_unit_id);


--
-- Name: internship_internshipspeciality_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspeciality_68b226f5 ON internship_internshipspeciality USING btree (cohort_id);


--
-- Name: internship_internshipspeciality_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspeciality_ef7c876f ON internship_internshipspeciality USING btree (uuid);


--
-- Name: internship_internshipspecialitygroup_name_aeb0d50a_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspecialitygroup_name_aeb0d50a_like ON internship_internshipspecialitygroup USING btree (name varchar_pattern_ops);


--
-- Name: internship_internshipspecialitygroupmember_0e939a4f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspecialitygroupmember_0e939a4f ON internship_internshipspecialitygroupmember USING btree (group_id);


--
-- Name: internship_internshipspecialitygroupmember_66db61fe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipspecialitygroupmember_66db61fe ON internship_internshipspecialitygroupmember USING btree (speciality_id);


--
-- Name: internship_internshipstudentaffectationstat_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentaffectationstat_26b2345e ON internship_internshipstudentaffectationstat USING btree (organization_id);


--
-- Name: internship_internshipstudentaffectationstat_30a811f6; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentaffectationstat_30a811f6 ON internship_internshipstudentaffectationstat USING btree (student_id);


--
-- Name: internship_internshipstudentaffectationstat_66db61fe; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentaffectationstat_66db61fe ON internship_internshipstudentaffectationstat USING btree (speciality_id);


--
-- Name: internship_internshipstudentaffectationstat_b1efa79f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentaffectationstat_b1efa79f ON internship_internshipstudentaffectationstat USING btree (period_id);


--
-- Name: internship_internshipstudentaffectationstat_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentaffectationstat_ef7c876f ON internship_internshipstudentaffectationstat USING btree (uuid);


--
-- Name: internship_internshipstudentinformation_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentinformation_68b226f5 ON internship_internshipstudentinformation USING btree (cohort_id);


--
-- Name: internship_internshipstudentinformation_a8452ca7; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentinformation_a8452ca7 ON internship_internshipstudentinformation USING btree (person_id);


--
-- Name: internship_internshipstudentinformation_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_internshipstudentinformation_ef7c876f ON internship_internshipstudentinformation USING btree (uuid);


--
-- Name: internship_organization_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_organization_68b226f5 ON internship_organization USING btree (cohort_id);


--
-- Name: internship_organization_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_organization_ef7c876f ON internship_organization USING btree (uuid);


--
-- Name: internship_organizationaddress_26b2345e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_organizationaddress_26b2345e ON internship_organizationaddress USING btree (organization_id);


--
-- Name: internship_organizationaddress_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_organizationaddress_ef7c876f ON internship_organizationaddress USING btree (uuid);


--
-- Name: internship_period_68b226f5; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_period_68b226f5 ON internship_period USING btree (cohort_id);


--
-- Name: internship_period_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_period_ef7c876f ON internship_period USING btree (uuid);


--
-- Name: internship_periodinternshipplaces_b1efa79f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_periodinternshipplaces_b1efa79f ON internship_periodinternshipplaces USING btree (period_id);


--
-- Name: internship_periodinternshipplaces_ccd05cf1; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_periodinternshipplaces_ccd05cf1 ON internship_periodinternshipplaces USING btree (internship_offer_id);


--
-- Name: internship_periodinternshipplaces_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX internship_periodinternshipplaces_ef7c876f ON internship_periodinternshipplaces USING btree (uuid);


--
-- Name: osis_common_documentfile_14c4b06b; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX osis_common_documentfile_14c4b06b ON osis_common_documentfile USING btree (update_by);


--
-- Name: osis_common_documentfile_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX osis_common_documentfile_ef7c876f ON osis_common_documentfile USING btree (uuid);


--
-- Name: osis_common_messagehistory_b8af13ea; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX osis_common_messagehistory_b8af13ea ON osis_common_messagehistory USING btree (reference);


--
-- Name: osis_common_messagehistory_receiver_id_63882ade_uniq; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX osis_common_messagehistory_receiver_id_63882ade_uniq ON osis_common_messagehistory USING btree (receiver_id);


--
-- Name: osis_common_messagehistory_reference_6be70292_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX osis_common_messagehistory_reference_6be70292_like ON osis_common_messagehistory USING btree (reference varchar_pattern_ops);


--
-- Name: reference_continent_code_885a1e14_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_continent_code_885a1e14_like ON reference_continent USING btree (code varchar_pattern_ops);


--
-- Name: reference_country_071e6d87; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_country_071e6d87 ON reference_country USING btree (continent_id);


--
-- Name: reference_country_2c7d5721; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_country_2c7d5721 ON reference_country USING btree (currency_id);


--
-- Name: reference_country_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_country_ef7c876f ON reference_country USING btree (uuid);


--
-- Name: reference_country_iso_code_771b0f2c_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_country_iso_code_771b0f2c_like ON reference_country USING btree (iso_code varchar_pattern_ops);


--
-- Name: reference_country_name_b8bec601_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_country_name_b8bec601_like ON reference_country USING btree (name varchar_pattern_ops);


--
-- Name: reference_currency_name_02d430de_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_currency_name_02d430de_like ON reference_currency USING btree (name varchar_pattern_ops);


--
-- Name: reference_decree_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_decree_ef7c876f ON reference_decree USING btree (uuid);


--
-- Name: reference_decree_name_1d7aec78_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_decree_name_1d7aec78_like ON reference_decree USING btree (name varchar_pattern_ops);


--
-- Name: reference_domain_47723a7e; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_domain_47723a7e ON reference_domain USING btree (decree_id);


--
-- Name: reference_domain_6be37982; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_domain_6be37982 ON reference_domain USING btree (parent_id);


--
-- Name: reference_domain_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_domain_ef7c876f ON reference_domain USING btree (uuid);


--
-- Name: reference_gradetype_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_gradetype_ef7c876f ON reference_gradetype USING btree (uuid);


--
-- Name: reference_language_code_226677c1_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_language_code_226677c1_like ON reference_language USING btree (code varchar_pattern_ops);


--
-- Name: reference_language_ef7c876f; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_language_ef7c876f ON reference_language USING btree (uuid);


--
-- Name: reference_language_name_e0212781_like; Type: INDEX; Schema: public; Owner: test
--

CREATE INDEX reference_language_name_e0212781_like ON reference_language USING btree (name varchar_pattern_ops);


--
-- Name: update_academiccalendar_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_academiccalendar_modtime BEFORE INSERT OR UPDATE ON base_academiccalendar FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_academicyear_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_academicyear_modtime BEFORE INSERT OR UPDATE ON base_academicyear FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_attribution_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_attribution_modtime BEFORE INSERT OR UPDATE ON base_attribution FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_examenrollment_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_examenrollment_modtime BEFORE INSERT OR UPDATE ON base_examenrollment FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_learningunit_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_learningunit_modtime BEFORE INSERT OR UPDATE ON base_learningunit FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_learningunitenrollment_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_learningunitenrollment_modtime BEFORE INSERT OR UPDATE ON base_learningunitenrollment FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_learningunityear_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_learningunityear_modtime BEFORE INSERT OR UPDATE ON base_learningunityear FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_offer_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_offer_modtime BEFORE INSERT OR UPDATE ON base_offer FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_offerenrollment_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_offerenrollment_modtime BEFORE INSERT OR UPDATE ON base_offerenrollment FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_offeryear_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_offeryear_modtime BEFORE INSERT OR UPDATE ON base_offeryear FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_offeryearcalendar_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_offeryearcalendar_modtime BEFORE INSERT OR UPDATE ON base_offeryearcalendar FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_organization_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_organization_modtime BEFORE INSERT OR UPDATE ON base_organization FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_person_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_person_modtime BEFORE INSERT OR UPDATE ON base_person FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_programmemanager_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_programmemanager_modtime BEFORE INSERT OR UPDATE ON base_programmanager FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_sessionexam_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_sessionexam_modtime BEFORE INSERT OR UPDATE ON base_sessionexam FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_structure_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_structure_modtime BEFORE INSERT OR UPDATE ON base_structure FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_student_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_student_modtime BEFORE INSERT OR UPDATE ON base_student FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: update_tutor_modtime; Type: TRIGGER; Schema: public; Owner: test
--

CREATE TRIGGER update_tutor_modtime BEFORE INSERT OR UPDATE ON base_tutor FOR EACH ROW EXECUTE PROCEDURE update_changed_column();


--
-- Name: D25f9646f5fc8cd455c94d865437a650; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollment
    ADD CONSTRAINT "D25f9646f5fc8cd455c94d865437a650" FOREIGN KEY (learning_unit_enrollment_id) REFERENCES base_learningunitenrollment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D3c1de29227b3477587095b9b0600352; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attributioncharge
    ADD CONSTRAINT "D3c1de29227b3477587095b9b0600352" FOREIGN KEY (learning_unit_component_id) REFERENCES base_learningunitcomponent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D410b58353e066ce50e43107793bdc59; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionoffer
    ADD CONSTRAINT "D410b58353e066ce50e43107793bdc59" FOREIGN KEY (proposition_dissertation_id) REFERENCES dissertation_propositiondissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D57c51c2de90255a8978f16e2f659c13; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionoffer
    ADD CONSTRAINT "D57c51c2de90255a8978f16e2f659c13" FOREIGN KEY (offer_proposition_id) REFERENCES dissertation_offerproposition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D63f9cf74559e06217c1c4ab8f42f686; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT "D63f9cf74559e06217c1c4ab8f42f686" FOREIGN KEY (proposition_dissertation_id) REFERENCES dissertation_propositiondissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D760c98efb9a5d76cd9f8c2c2ee7445c; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponentclass
    ADD CONSTRAINT "D760c98efb9a5d76cd9f8c2c2ee7445c" FOREIGN KEY (learning_unit_component_id) REFERENCES base_learningunitcomponent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D9a3e1b746502121c0ce6f26b33dc75f; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondocumentfile
    ADD CONSTRAINT "D9a3e1b746502121c0ce6f26b33dc75f" FOREIGN KEY (proposition_id) REFERENCES dissertation_propositiondissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: a7ff1014ff36dbf382c6c17ac441d59a; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclassyear
    ADD CONSTRAINT a7ff1014ff36dbf382c6c17ac441d59a FOREIGN KEY (learning_component_year_id) REFERENCES base_learningcomponentyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assi_learning_unit_year_id_5989cf39_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_tutoringlearningunityear
    ADD CONSTRAINT assi_learning_unit_year_id_5989cf39_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assist_document_file_id_bcc63424_fk_osis_common_documentfile_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantdocumentfile
    ADD CONSTRAINT assist_document_file_id_bcc63424_fk_osis_common_documentfile_id FOREIGN KEY (document_file_id) REFERENCES osis_common_documentfile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assista_assistant_id_cc43d98c_fk_assistant_academicassistant_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantmandate
    ADD CONSTRAINT assista_assistant_id_cc43d98c_fk_assistant_academicassistant_id FOREIGN KEY (assistant_id) REFERENCES assistant_academicassistant(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant__mandate_id_632c08ce_fk_assistant_assistantmandate_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_tutoringlearningunityear
    ADD CONSTRAINT assistant__mandate_id_632c08ce_fk_assistant_assistantmandate_id FOREIGN KEY (mandate_id) REFERENCES assistant_assistantmandate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant__mandate_id_a1107373_fk_assistant_assistantmandate_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_review
    ADD CONSTRAINT assistant__mandate_id_a1107373_fk_assistant_assistantmandate_id FOREIGN KEY (mandate_id) REFERENCES assistant_assistantmandate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_academicassi_supervisor_id_c4ab787e_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_academicassistant
    ADD CONSTRAINT assistant_academicassi_supervisor_id_c4ab787e_fk_base_person_id FOREIGN KEY (supervisor_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_academicassistan_person_id_74484c4b_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_academicassistant
    ADD CONSTRAINT assistant_academicassistan_person_id_74484c4b_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_ass_academic_year_id_d43e5162_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantmandate
    ADD CONSTRAINT assistant_ass_academic_year_id_d43e5162_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_manager_person_id_eb312759_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_manager
    ADD CONSTRAINT assistant_manager_person_id_eb312759_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_mandate_id_0a1f4092_fk_assistant_assistantmandate_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_mandatestructure
    ADD CONSTRAINT assistant_mandate_id_0a1f4092_fk_assistant_assistantmandate_id FOREIGN KEY (assistant_mandate_id) REFERENCES assistant_assistantmandate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_mandate_id_65b611d2_fk_assistant_assistantmandate_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_assistantdocumentfile
    ADD CONSTRAINT assistant_mandate_id_65b611d2_fk_assistant_assistantmandate_id FOREIGN KEY (assistant_mandate_id) REFERENCES assistant_assistantmandate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_mandatestr_structure_id_5af04b67_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_mandatestructure
    ADD CONSTRAINT assistant_mandatestr_structure_id_5af04b67_fk_base_structure_id FOREIGN KEY (structure_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_mes_academic_year_id_4e9a6673_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_message
    ADD CONSTRAINT assistant_mes_academic_year_id_4e9a6673_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_message_sender_id_dc7f989d_fk_assistant_manager_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_message
    ADD CONSTRAINT assistant_message_sender_id_dc7f989d_fk_assistant_manager_id FOREIGN KEY (sender_id) REFERENCES assistant_manager(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_review_reviewer_id_53b0e750_fk_assistant_reviewer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_review
    ADD CONSTRAINT assistant_review_reviewer_id_53b0e750_fk_assistant_reviewer_id FOREIGN KEY (reviewer_id) REFERENCES assistant_reviewer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_reviewer_person_id_c640593c_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_reviewer
    ADD CONSTRAINT assistant_reviewer_person_id_c640593c_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: assistant_reviewer_structure_id_7a1f6af1_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY assistant_reviewer
    ADD CONSTRAINT assistant_reviewer_structure_id_7a1f6af1_fk_base_structure_id FOREIGN KEY (structure_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: attr_learning_unit_year_id_b2374067_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attribution
    ADD CONSTRAINT attr_learning_unit_year_id_b2374067_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: attributi_attribution_id_f354a484_fk_attribution_attribution_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attributioncharge
    ADD CONSTRAINT attributi_attribution_id_f354a484_fk_attribution_attribution_id FOREIGN KEY (attribution_id) REFERENCES attribution_attribution(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: attribution_attribution_tutor_id_1cb5e9cf_fk_base_tutor_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY attribution_attribution
    ADD CONSTRAINT attribution_attribution_tutor_id_1cb5e9cf_fk_base_tutor_id FOREIGN KEY (tutor_id) REFERENCES base_tutor(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_per_permission_id_1fbb5f2c_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_per_permission_id_1fbb5f2c_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: b23225bc6d12b18bc23b517aee75560f; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponent
    ADD CONSTRAINT b23225bc6d12b18bc23b517aee75560f FOREIGN KEY (learning_component_year_id) REFERENCES base_learningcomponentyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_component_id_b45a40ba_fk_base_learningcomponent_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclass
    ADD CONSTRAINT bas_learning_component_id_b45a40ba_fk_base_learningcomponent_id FOREIGN KEY (learning_component_id) REFERENCES base_learningcomponent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_component_id_dd0eb362_fk_base_learningcomponent_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponentyear
    ADD CONSTRAINT bas_learning_component_id_dd0eb362_fk_base_learningcomponent_id FOREIGN KEY (learning_component_id) REFERENCES base_learningcomponent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_container_id_74cec22a_fk_base_learningcontainer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontaineryear
    ADD CONSTRAINT bas_learning_container_id_74cec22a_fk_base_learningcontainer_id FOREIGN KEY (learning_container_id) REFERENCES base_learningcontainer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_container_id_87aab887_fk_base_learningcontainer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunit
    ADD CONSTRAINT bas_learning_container_id_87aab887_fk_base_learningcontainer_id FOREIGN KEY (learning_container_id) REFERENCES base_learningcontainer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_container_id_bdb8b178_fk_base_learningcontainer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponent
    ADD CONSTRAINT bas_learning_container_id_bdb8b178_fk_base_learningcontainer_id FOREIGN KEY (learning_container_id) REFERENCES base_learningcontainer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: bas_learning_unit_year_id_fadb50ca_fk_base_learningclassyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponentclass
    ADD CONSTRAINT bas_learning_unit_year_id_fadb50ca_fk_base_learningclassyear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningclassyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base__academic_calendar_id_9d08d20d_fk_base_academiccalendar_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryearcalendar
    ADD CONSTRAINT base__academic_calendar_id_9d08d20d_fk_base_academiccalendar_id FOREIGN KEY (academic_calendar_id) REFERENCES base_academiccalendar(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base__academic_calendar_id_b0a0842b_fk_base_academiccalendar_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamcalendar
    ADD CONSTRAINT base__academic_calendar_id_b0a0842b_fk_base_academiccalendar_id FOREIGN KEY (academic_calendar_id) REFERENCES base_academiccalendar(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_academic_academic_year_id_13b1f92c_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_academiccalendar
    ADD CONSTRAINT base_academic_academic_year_id_13b1f92c_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_attribution_tutor_id_d69a530c_fk_base_tutor_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_attribution
    ADD CONSTRAINT base_attribution_tutor_id_d69a530c_fk_base_tutor_id FOREIGN KEY (tutor_id) REFERENCES base_tutor(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_campus_organization_id_e252e0ae_fk_base_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_campus
    ADD CONSTRAINT base_campus_organization_id_e252e0ae_fk_base_organization_id FOREIGN KEY (organization_id) REFERENCES base_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entity_administration_fac_id_16a30cb2_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_entity_administration_fac_id_16a30cb2_fk_base_structure_id FOREIGN KEY (entity_administration_fac_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entity_organization_id_88f2b05c_fk_base_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entity
    ADD CONSTRAINT base_entity_organization_id_88f2b05c_fk_base_organization_id FOREIGN KEY (organization_id) REFERENCES base_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entityaddress_entity_id_857bd6fd_fk_base_entity_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityaddress
    ADD CONSTRAINT base_entityaddress_entity_id_857bd6fd_fk_base_entity_id FOREIGN KEY (entity_id) REFERENCES base_entity(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entitylink_child_id_b849a680_fk_base_entity_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitylink
    ADD CONSTRAINT base_entitylink_child_id_b849a680_fk_base_entity_id FOREIGN KEY (child_id) REFERENCES base_entity(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entitylink_parent_id_a9702b1d_fk_base_entity_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitylink
    ADD CONSTRAINT base_entitylink_parent_id_a9702b1d_fk_base_entity_id FOREIGN KEY (parent_id) REFERENCES base_entity(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entitymanager_person_id_ebcb8095_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitymanager
    ADD CONSTRAINT base_entitymanager_person_id_ebcb8095_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entitymanager_structure_id_b3281376_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entitymanager
    ADD CONSTRAINT base_entitymanager_structure_id_b3281376_fk_base_structure_id FOREIGN KEY (structure_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_entityversion_entity_id_38c40f12_fk_base_entity_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_entityversion
    ADD CONSTRAINT base_entityversion_entity_id_38c40f12_fk_base_entity_id FOREIGN KEY (entity_id) REFERENCES base_entity(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_exam_exam_enrollment_id_ee2c3ff8_fk_base_examenrollment_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollmenthistory
    ADD CONSTRAINT base_exam_exam_enrollment_id_ee2c3ff8_fk_base_examenrollment_id FOREIGN KEY (exam_enrollment_id) REFERENCES base_examenrollment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_examenroll_session_exam_id_098f4859_fk_base_sessionexam_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollment
    ADD CONSTRAINT base_examenroll_session_exam_id_098f4859_fk_base_sessionexam_id FOREIGN KEY (session_exam_id) REFERENCES base_sessionexam(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_examenrollmenthistory_person_id_6666e6d5_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_examenrollmenthistory
    ADD CONSTRAINT base_examenrollmenthistory_person_id_6666e6d5_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_externalo_grade_type_id_d5eac430_fk_reference_gradetype_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externalo_grade_type_id_d5eac430_fk_reference_gradetype_id FOREIGN KEY (grade_type_id) REFERENCES reference_gradetype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_externaloffer_domain_id_004a5b8e_fk_reference_domain_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externaloffer_domain_id_004a5b8e_fk_reference_domain_id FOREIGN KEY (domain_id) REFERENCES reference_domain(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_externaloffer_offer_year_id_bda0c186_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_externaloffer
    ADD CONSTRAINT base_externaloffer_offer_year_id_bda0c186_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_le_offer_enrollment_id_75b2f42c_fk_base_offerenrollment_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitenrollment
    ADD CONSTRAINT base_le_offer_enrollment_id_75b2f42c_fk_base_offerenrollment_id FOREIGN KEY (offer_enrollment_id) REFERENCES base_offerenrollment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learni_learning_class_id_d49bf1dc_fk_base_learningclass_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningclassyear
    ADD CONSTRAINT base_learni_learning_class_id_d49bf1dc_fk_base_learningclass_id FOREIGN KEY (learning_class_id) REFERENCES base_learningclass(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_academic_year_id_82d3f133_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT base_learning_academic_year_id_82d3f133_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_academic_year_id_ef7986a9_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcontaineryear
    ADD CONSTRAINT base_learning_academic_year_id_ef7986a9_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_learning_unit_id_579df9b8_fk_base_learningunit_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT base_learning_learning_unit_id_579df9b8_fk_base_learningunit_id FOREIGN KEY (learning_unit_id) REFERENCES base_learningunit(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_unit_year_id_3945a7f2_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexam
    ADD CONSTRAINT base_learning_unit_year_id_3945a7f2_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_unit_year_id_5327cb9a_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitenrollment
    ADD CONSTRAINT base_learning_unit_year_id_5327cb9a_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_unit_year_id_b8acd330_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_attribution
    ADD CONSTRAINT base_learning_unit_year_id_b8acd330_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learning_unit_year_id_c0e18496_fk_base_learningunityear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunitcomponent
    ADD CONSTRAINT base_learning_unit_year_id_c0e18496_fk_base_learningunityear_id FOREIGN KEY (learning_unit_year_id) REFERENCES base_learningunityear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_learningunityea_structure_id_85a7343e_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT base_learningunityea_structure_id_85a7343e_fk_base_structure_id FOREIGN KEY (structure_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_off_entity_administration_id_8e1d39ad_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_off_entity_administration_id_8e1d39ad_fk_base_structure_id FOREIGN KEY (entity_administration_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_off_entity_management_fac_id_ea8e6fb5_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_off_entity_management_fac_id_ea8e6fb5_fk_base_structure_id FOREIGN KEY (entity_management_fac_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offerenrollmen_offer_year_id_c57d488d_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offerenrollment
    ADD CONSTRAINT base_offerenrollmen_offer_year_id_c57d488d_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offerenrollment_student_id_03f0d112_fk_base_student_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offerenrollment
    ADD CONSTRAINT base_offerenrollment_student_id_03f0d112_fk_base_student_id FOREIGN KEY (student_id) REFERENCES base_student(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offerye_entity_management_id_f56358de_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offerye_entity_management_id_f56358de_fk_base_structure_id FOREIGN KEY (entity_management_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryea_academic_year_id_2dbbe645_fk_base_academicyear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryea_academic_year_id_2dbbe645_fk_base_academicyear_id FOREIGN KEY (academic_year_id) REFERENCES base_academicyear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_campus_id_22a305e9_fk_base_campus_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_campus_id_22a305e9_fk_base_campus_id FOREIGN KEY (campus_id) REFERENCES base_campus(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_country_id_ce7b6355_fk_reference_country_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_country_id_ce7b6355_fk_reference_country_id FOREIGN KEY (country_id) REFERENCES reference_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_grade_type_id_f845ccee_fk_reference_gradetype_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_grade_type_id_f845ccee_fk_reference_gradetype_id FOREIGN KEY (grade_type_id) REFERENCES reference_gradetype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_offer_id_b60f9a6d_fk_base_offer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_offer_id_b60f9a6d_fk_base_offer_id FOREIGN KEY (offer_id) REFERENCES base_offer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_offer_type_id_c639e89e_fk_base_offertype_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_offer_type_id_c639e89e_fk_base_offertype_id FOREIGN KEY (offer_type_id) REFERENCES base_offertype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryear_parent_id_b93e67bb_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryear
    ADD CONSTRAINT base_offeryear_parent_id_b93e67bb_fk_base_offeryear_id FOREIGN KEY (parent_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryearcalen_offer_year_id_c0a3411e_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryearcalendar
    ADD CONSTRAINT base_offeryearcalen_offer_year_id_c0a3411e_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryeardomai_offer_year_id_8a4de6ae_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryeardomain
    ADD CONSTRAINT base_offeryeardomai_offer_year_id_8a4de6ae_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_offeryeardomain_domain_id_79dd4578_fk_reference_domain_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_offeryeardomain
    ADD CONSTRAINT base_offeryeardomain_domain_id_79dd4578_fk_reference_domain_id FOREIGN KEY (domain_id) REFERENCES reference_domain(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_organizat_organization_id_18df57cc_fk_base_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organizationaddress
    ADD CONSTRAINT base_organizat_organization_id_18df57cc_fk_base_organization_id FOREIGN KEY (organization_id) REFERENCES base_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_organizationad_country_id_de0c1553_fk_reference_country_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_organizationaddress
    ADD CONSTRAINT base_organizationad_country_id_de0c1553_fk_reference_country_id FOREIGN KEY (country_id) REFERENCES reference_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_person_user_id_b326197b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_person
    ADD CONSTRAINT base_person_user_id_b326197b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_personaddress_country_id_b0da720a_fk_reference_country_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_personaddress
    ADD CONSTRAINT base_personaddress_country_id_b0da720a_fk_reference_country_id FOREIGN KEY (country_id) REFERENCES reference_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_personaddress_person_id_8634bbbc_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_personaddress
    ADD CONSTRAINT base_personaddress_person_id_8634bbbc_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_programmanager_offer_year_id_b83451f6_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_programmanager
    ADD CONSTRAINT base_programmanager_offer_year_id_b83451f6_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_programmemanager_person_id_02cc0ec1_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_programmanager
    ADD CONSTRAINT base_programmemanager_person_id_02cc0ec1_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_se_offer_enrollment_id_45d9b431_fk_base_offerenrollment_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexamdeadline
    ADD CONSTRAINT base_se_offer_enrollment_id_45d9b431_fk_base_offerenrollment_id FOREIGN KEY (offer_enrollment_id) REFERENCES base_offerenrollment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_sessionexam_offer_year_id_e5d52396_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_sessionexam
    ADD CONSTRAINT base_sessionexam_offer_year_id_e5d52396_fk_base_offeryear_id FOREIGN KEY (offer_year_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_structure_organization_id_2508b4f1_fk_base_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structure
    ADD CONSTRAINT base_structure_organization_id_2508b4f1_fk_base_organization_id FOREIGN KEY (organization_id) REFERENCES base_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_structure_part_of_id_e3fc8a7b_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structure
    ADD CONSTRAINT base_structure_part_of_id_e3fc8a7b_fk_base_structure_id FOREIGN KEY (part_of_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_structureaddre_country_id_3c8a1dd6_fk_reference_country_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structureaddress
    ADD CONSTRAINT base_structureaddre_country_id_3c8a1dd6_fk_reference_country_id FOREIGN KEY (country_id) REFERENCES reference_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_structureaddres_structure_id_b5caa689_fk_base_structure_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_structureaddress
    ADD CONSTRAINT base_structureaddres_structure_id_b5caa689_fk_base_structure_id FOREIGN KEY (structure_id) REFERENCES base_structure(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_student_person_id_32cc4c8a_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_student
    ADD CONSTRAINT base_student_person_id_32cc4c8a_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: base_tutor_person_id_f372d4b9_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_tutor
    ADD CONSTRAINT base_tutor_person_id_f372d4b9_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: c02f9608b324db99295b815df4fc84ff; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionrole
    ADD CONSTRAINT c02f9608b324db99295b815df4fc84ff FOREIGN KEY (proposition_dissertation_id) REFERENCES dissertation_propositiondissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: c82d312d3a4f609042c744983b285fe2; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship
    ADD CONSTRAINT c82d312d3a4f609042c744983b285fe2 FOREIGN KEY (alternate_speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cms_textlabel_parent_id_dc218655_fk_cms_textlabel_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_textlabel
    ADD CONSTRAINT cms_textlabel_parent_id_dc218655_fk_cms_textlabel_id FOREIGN KEY (parent_id) REFERENCES cms_textlabel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cms_translatedtex_language_id_5cbb9090_fk_reference_language_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtextlabel
    ADD CONSTRAINT cms_translatedtex_language_id_5cbb9090_fk_reference_language_id FOREIGN KEY (language_id) REFERENCES reference_language(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cms_translatedtex_language_id_7e34595e_fk_reference_language_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtext
    ADD CONSTRAINT cms_translatedtex_language_id_7e34595e_fk_reference_language_id FOREIGN KEY (language_id) REFERENCES reference_language(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cms_translatedtext_text_label_id_04bde33e_fk_cms_textlabel_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtext
    ADD CONSTRAINT cms_translatedtext_text_label_id_04bde33e_fk_cms_textlabel_id FOREIGN KEY (text_label_id) REFERENCES cms_textlabel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: cms_translatedtextla_text_label_id_62636b7c_fk_cms_textlabel_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY cms_translatedtextlabel
    ADD CONSTRAINT cms_translatedtextla_text_label_id_62636b7c_fk_cms_textlabel_id FOREIGN KEY (text_label_id) REFERENCES cms_textlabel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: de6f766bd0ab2156356942b7a25776e4; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningcomponentyear
    ADD CONSTRAINT de6f766bd0ab2156356942b7a25776e4 FOREIGN KEY (learning_container_year_id) REFERENCES base_learningcontaineryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: di_location_id_f73bc7b2_fk_dissertation_dissertationlocation_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT di_location_id_f73bc7b2_fk_dissertation_dissertationlocation_id FOREIGN KEY (location_id) REFERENCES dissertation_dissertationlocation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_dissertation_id_03792ae6_fk_dissertation_dissertation_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationdocumentfile
    ADD CONSTRAINT disser_dissertation_id_03792ae6_fk_dissertation_dissertation_id FOREIGN KEY (dissertation_id) REFERENCES dissertation_dissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_dissertation_id_5a2a09d1_fk_dissertation_dissertation_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationrole
    ADD CONSTRAINT disser_dissertation_id_5a2a09d1_fk_dissertation_dissertation_id FOREIGN KEY (dissertation_id) REFERENCES dissertation_dissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_dissertation_id_8a963341_fk_dissertation_dissertation_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationupdate
    ADD CONSTRAINT disser_dissertation_id_8a963341_fk_dissertation_dissertation_id FOREIGN KEY (dissertation_id) REFERENCES dissertation_dissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_dissertation_id_c6a3567b_fk_dissertation_dissertation_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationgroup
    ADD CONSTRAINT disser_dissertation_id_c6a3567b_fk_dissertation_dissertation_id FOREIGN KEY (dissertation_id) REFERENCES dissertation_dissertation(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_document_file_id_390234d6_fk_osis_common_documentfile_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondocumentfile
    ADD CONSTRAINT disser_document_file_id_390234d6_fk_osis_common_documentfile_id FOREIGN KEY (document_file_id) REFERENCES osis_common_documentfile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: disser_document_file_id_74533f40_fk_osis_common_documentfile_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationdocumentfile
    ADD CONSTRAINT disser_document_file_id_74533f40_fk_osis_common_documentfile_id FOREIGN KEY (document_file_id) REFERENCES osis_common_documentfile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation__offer_year_start_id_9e27de8a_fk_base_offeryear_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT dissertation__offer_year_start_id_9e27de8a_fk_base_offeryear_id FOREIGN KEY (offer_year_start_id) REFERENCES base_offeryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_adviser_person_id_aeb8632c_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_adviser
    ADD CONSTRAINT dissertation_adviser_person_id_aeb8632c_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_dis_adviser_id_778a88c6_fk_dissertation_adviser_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationrole
    ADD CONSTRAINT dissertation_dis_adviser_id_778a88c6_fk_dissertation_adviser_id FOREIGN KEY (adviser_id) REFERENCES dissertation_adviser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_dissertation_author_id_bf0ae984_fk_base_student_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertation
    ADD CONSTRAINT dissertation_dissertation_author_id_bf0ae984_fk_base_student_id FOREIGN KEY (author_id) REFERENCES base_student(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_dissertationu_person_id_a1ce7608_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_dissertationupdate
    ADD CONSTRAINT dissertation_dissertationu_person_id_a1ce7608_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_fac_adviser_id_51ef7acc_fk_dissertation_adviser_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_facultyadviser
    ADD CONSTRAINT dissertation_fac_adviser_id_51ef7acc_fk_dissertation_adviser_id FOREIGN KEY (adviser_id) REFERENCES dissertation_adviser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_facultyadviser_offer_id_c551c6cd_fk_base_offer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_facultyadviser
    ADD CONSTRAINT dissertation_facultyadviser_offer_id_c551c6cd_fk_base_offer_id FOREIGN KEY (offer_id) REFERENCES base_offer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_offerpropositio_offer_id_f2982d76_fk_base_offer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_offerproposition
    ADD CONSTRAINT dissertation_offerpropositio_offer_id_f2982d76_fk_base_offer_id FOREIGN KEY (offer_id) REFERENCES base_offer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_pro_adviser_id_f52cb2f0_fk_dissertation_adviser_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositionrole
    ADD CONSTRAINT dissertation_pro_adviser_id_f52cb2f0_fk_dissertation_adviser_id FOREIGN KEY (adviser_id) REFERENCES dissertation_adviser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_prop_author_id_fe4d5ea8_fk_dissertation_adviser_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondissertation
    ADD CONSTRAINT dissertation_prop_author_id_fe4d5ea8_fk_dissertation_adviser_id FOREIGN KEY (author_id) REFERENCES dissertation_adviser(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dissertation_propositiond_creator_id_bc1a6ec8_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY dissertation_propositiondissertation
    ADD CONSTRAINT dissertation_propositiond_creator_id_bc1a6ec8_fk_base_person_id FOREIGN KEY (creator_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: eb26a36bfac894fb4146219754ab256e; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY base_learningunityear
    ADD CONSTRAINT eb26a36bfac894fb4146219754ab256e FOREIGN KEY (learning_container_year_id) REFERENCES base_learningcontaineryear(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: i_internship_offer_id_31b75166_fk_internship_internshipoffer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT i_internship_offer_id_31b75166_fk_internship_internshipoffer_id FOREIGN KEY (internship_offer_id) REFERENCES internship_internshipoffer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: i_internship_offer_id_71789c65_fk_internship_internshipoffer_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_periodinternshipplaces
    ADD CONSTRAINT i_internship_offer_id_71789c65_fk_internship_internshipoffer_id FOREIGN KEY (internship_offer_id) REFERENCES internship_internshipoffer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_group_id_f1ab30e2_fk_internship_internshipspecialitygroup_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroupmember
    ADD CONSTRAINT in_group_id_f1ab30e2_fk_internship_internshipspecialitygroup_id FOREIGN KEY (group_id) REFERENCES internship_internshipspecialitygroup(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_speciality_id_285691f7_fk_internship_internshipspeciality_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT in_speciality_id_285691f7_fk_internship_internshipspeciality_id FOREIGN KEY (speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_speciality_id_7c3b7cdd_fk_internship_internshipspeciality_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT in_speciality_id_7c3b7cdd_fk_internship_internshipspeciality_id FOREIGN KEY (speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_speciality_id_acd8dd28_fk_internship_internshipspeciality_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspecialitygroupmember
    ADD CONSTRAINT in_speciality_id_acd8dd28_fk_internship_internshipspeciality_id FOREIGN KEY (speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_speciality_id_fb77a022_fk_internship_internshipspeciality_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT in_speciality_id_fb77a022_fk_internship_internshipspeciality_id FOREIGN KEY (speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: in_speciality_id_ff9160bb_fk_internship_internshipspeciality_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship
    ADD CONSTRAINT in_speciality_id_ff9160bb_fk_internship_internshipspeciality_id FOREIGN KEY (speciality_id) REFERENCES internship_internshipspeciality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internsh_organization_id_0a39cd57_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internsh_organization_id_0a39cd57_fk_internship_organization_id FOREIGN KEY (organization_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internsh_organization_id_0e49c904_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organizationaddress
    ADD CONSTRAINT internsh_organization_id_0e49c904_fk_internship_organization_id FOREIGN KEY (organization_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internsh_organization_id_1eedff40_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT internsh_organization_id_1eedff40_fk_internship_organization_id FOREIGN KEY (organization_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internsh_organization_id_8ea5faff_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT internsh_organization_id_8ea5faff_fk_internship_organization_id FOREIGN KEY (organization_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internsh_organization_id_eeb83f26_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipmaster
    ADD CONSTRAINT internsh_organization_id_eeb83f26_fk_internship_organization_id FOREIGN KEY (organization_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_affectati_cohort_id_772e57a2_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_affectationgenerationtime
    ADD CONSTRAINT internship_affectati_cohort_id_772e57a2_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_i_internship_id_311778f6_fk_internship_internship_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT internship_i_internship_id_311778f6_fk_internship_internship_id FOREIGN KEY (internship_id) REFERENCES internship_internship(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_i_internship_id_4d2fcaed_fk_internship_internship_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internship_i_internship_id_4d2fcaed_fk_internship_internship_id FOREIGN KEY (internship_id) REFERENCES internship_internship(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_i_internship_id_f42380a3_fk_internship_internship_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT internship_i_internship_id_f42380a3_fk_internship_internship_id FOREIGN KEY (internship_id) REFERENCES internship_internship(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_in_learning_unit_id_945409b7_fk_base_learningunit_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspeciality
    ADD CONSTRAINT internship_in_learning_unit_id_945409b7_fk_base_learningunit_id FOREIGN KEY (learning_unit_id) REFERENCES base_learningunit(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_inte_place_id_b0f929b4_fk_internship_organization_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT internship_inte_place_id_b0f929b4_fk_internship_organization_id FOREIGN KEY (place_id) REFERENCES internship_organization(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_cohort_id_12a85fd2_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentinformation
    ADD CONSTRAINT internship_internshi_cohort_id_12a85fd2_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_cohort_id_223e521f_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internship
    ADD CONSTRAINT internship_internshi_cohort_id_223e521f_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_cohort_id_4e5766ae_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipspeciality
    ADD CONSTRAINT internship_internshi_cohort_id_4e5766ae_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_cohort_id_8c4e6d3c_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipoffer
    ADD CONSTRAINT internship_internshi_cohort_id_8c4e6d3c_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_period_id_b4a42401_fk_internship_period_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT internship_internshi_period_id_b4a42401_fk_internship_period_id FOREIGN KEY (period_id) REFERENCES internship_period(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshi_period_id_d8cc87a7_fk_internship_period_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT internship_internshi_period_id_d8cc87a7_fk_internship_period_id FOREIGN KEY (period_id) REFERENCES internship_period(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshipcho_student_id_55d83cae_fk_base_student_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipchoice
    ADD CONSTRAINT internship_internshipcho_student_id_55d83cae_fk_base_student_id FOREIGN KEY (student_id) REFERENCES base_student(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshipenr_student_id_d2b822a9_fk_base_student_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipenrollment
    ADD CONSTRAINT internship_internshipenr_student_id_d2b822a9_fk_base_student_id FOREIGN KEY (student_id) REFERENCES base_student(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshipstu_student_id_609f387a_fk_base_student_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentaffectationstat
    ADD CONSTRAINT internship_internshipstu_student_id_609f387a_fk_base_student_id FOREIGN KEY (student_id) REFERENCES base_student(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_internshipstude_person_id_a2b4f624_fk_base_person_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_internshipstudentinformation
    ADD CONSTRAINT internship_internshipstude_person_id_a2b4f624_fk_base_person_id FOREIGN KEY (person_id) REFERENCES base_person(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_organizat_cohort_id_10bebe4a_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_organization
    ADD CONSTRAINT internship_organizat_cohort_id_10bebe4a_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_period_cohort_id_8e46a1c8_fk_internship_cohort_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_period
    ADD CONSTRAINT internship_period_cohort_id_8e46a1c8_fk_internship_cohort_id FOREIGN KEY (cohort_id) REFERENCES internship_cohort(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: internship_periodint_period_id_891e24fa_fk_internship_period_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY internship_periodinternshipplaces
    ADD CONSTRAINT internship_periodint_period_id_891e24fa_fk_internship_period_id FOREIGN KEY (period_id) REFERENCES internship_period(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reference_count_continent_id_d65b1e6d_fk_reference_continent_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_count_continent_id_d65b1e6d_fk_reference_continent_id FOREIGN KEY (continent_id) REFERENCES reference_continent(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reference_country_currency_id_7e8dcbda_fk_reference_currency_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_country
    ADD CONSTRAINT reference_country_currency_id_7e8dcbda_fk_reference_currency_id FOREIGN KEY (currency_id) REFERENCES reference_currency(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reference_domain_decree_id_0f562176_fk_reference_decree_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_domain
    ADD CONSTRAINT reference_domain_decree_id_0f562176_fk_reference_decree_id FOREIGN KEY (decree_id) REFERENCES reference_decree(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reference_domain_parent_id_2d6c9a97_fk_reference_domain_id; Type: FK CONSTRAINT; Schema: public; Owner: test
--

ALTER TABLE ONLY reference_domain
    ADD CONSTRAINT reference_domain_parent_id_2d6c9a97_fk_reference_domain_id FOREIGN KEY (parent_id) REFERENCES reference_domain(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

