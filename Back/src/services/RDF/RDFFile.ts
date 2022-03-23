import * as rdf from 'rdflib';
import { Event } from "../../database/entities/Event";

export function getRDFFile(events: Event[])
{
    
    const modelRdf = rdf.graph();

    const myNS = 'http://localhost:4200/rdf/events/';
    const seNS = 'https://schema.org/SportsEvent#';
    modelRdf.setPrefixForURI('esporte', seNS);

    const RDF = rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
    const RDFS = rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
    const XSD = rdf.Namespace('http://www.w3.org/2001/XMLSchema#');
    const SE = rdf.Namespace(seNS);

    const seType = rdf.sym(`${seNS}SportsEvent`);
    const seMaximumCapacity = rdf.sym(`${seNS}maximumAttendeeCapacity`);
    
    events.forEach((event) =>{
        const eventResource = rdf.sym(`${myNS}${event.id}`);
        modelRdf.add(eventResource, RDF('type'), seType);
        modelRdf.add(eventResource, RDFS('label'), event.title);
        modelRdf.add(eventResource, SE('name'), event.title);
        modelRdf.add(eventResource, SE('sport'), event.sport.name);
        modelRdf.add(eventResource, SE('location'), event.location);
        
        modelRdf.add(eventResource, seMaximumCapacity, rdf.lit(`${event.maximumNumberOfParticipants}`, '', XSD('integer')));
    });

    const allStatements = modelRdf.statementsMatching();
    const serializer = rdf.Serializer(modelRdf);
    
    return serializer.statementsToXML(allStatements);
}