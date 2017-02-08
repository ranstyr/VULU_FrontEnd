//import {module, inject} from './../../../test/test-helper';
import {expect} from 'chai';

require('./services.module');
require('../constants/constants.module');
require('../../models/models.module');

describe('Services - Network', () => {

    let network = null;
    let url = null;
    let $httpBackend = null;
    let modules = ['ngStorage', 'SignalR','si.services','si.constants','si.models'];

    beforeEach(() => {
        module(...modules);

        inject((_Network_, _API_URLS_, _$httpBackend_) =>  {
            network = _Network_;
            $httpBackend = _$httpBackend_;
            url = _API_URLS_;
        })
    });

    it('Get function - should return appropriate response',() =>  {
        
        let path = 'Authentication';
        let response = {Status: 'Ok'};

        $httpBackend.whenGET(url.API + 'Authentication').respond(200, response);

        network.get(path).then((data)  => {
            expect(JSON.stringify(data)).to.equals(JSON.stringify(response));
        });

        $httpBackend.flush();
    });

    it('Post function - should return appropriate response',() =>  {

        let path = 'Authentication';
        let response = {Status: 'Ok'};

        $httpBackend.whenPOST(url.API + 'Authentication').respond(200, response);

        network.post(path).then((data)  => {
            expect(JSON.stringify(data)).to.equals(JSON.stringify(response));
        });

        $httpBackend.flush();
    });

});